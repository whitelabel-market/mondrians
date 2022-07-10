import QRCode from "qrcode";
import { logger } from "../../logger/index.js";
import sharp from "sharp";
import fs from "fs";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://api.sandbox.prodigi.com/v4.0"
      : "https://api.prodigi.com/v4.0",
  headers: {
    "X-API-Key":
      process.env.NODE_ENV === "development"
        ? process.env.PRODIGI_DEV_KEY
        : process.env.PRODIGI_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * creates a new poster
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {HTML} - new poster
 */
export const getPoster = async (req, res, config) => {
  const { address } = req.query;

  if (!address) throw new Error("Missing address in query");

  const qrCode = await QRCode.toDataURL(address, {
    type: "image/png",
    quality: 1,
    width: 1582.7,
  });

  return res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
            theme: {
                extend: {
                spacing: {
                    "400px": "400px",
                },
                },
            },
            };
        </script>
        </head>
        <body>
        <div class="relative w-full h-screen bg-white">
            <div
            class="top-0 left-0 z-10 flex flex-col w-full h-screen bg-none p-400px"
            >
            <img
                src="https://i.ibb.co/ScRDzVp/pattern-1.png"
                alt="pattern-1"
                class="w-full px-400px"
            />
            <div class="flex justify-between mt-[32rem]">
                <div class="flex flex-col leading-none gap-[7rem]">
                <span class="text-[25rem] font-bold uppercase"
                    >Magic Mondrian #01</span
                >
                <div class="flex flex-col gap-[4rem] w-full">
                    <div class="flex items-center gap-[5rem] w-full">
                    <span
                        class="text-[18rem] font-extralight uppercase whitespace-nowrap"
                        >Mint Date:</span
                    >
                    <span
                        class="text-[18rem] font-semibold uppercase text-right w-full mr-[100rem]"
                        >01/01/2022</span
                    >
                    </div>
                    <div class="flex items-center gap-[5rem] w-full">
                    <span class="text-[18rem] font-extralight uppercase"
                        >Blockchain:</span
                    >
                    <span
                        class="text-[18rem] font-semibold uppercase text-right w-full mr-[100rem]"
                        >Polygon</span
                    >
                    </div>
                    <div class="flex items-center gap-[5rem] w-full">
                    <span class="text-[18rem] font-extralight uppercase"
                        >Owner:</span
                    >
                    <span
                        class="text-[18rem] font-semibold text-right w-full mr-[100rem]"
                        >0xe3bbf..1bc6a</span
                    >
                    </div>
                </div>
                </div>
                <img
                src="${qrCode}"
                alt=""
                class="aspect-square w-[110rem] -translate-y-[7rem]"
                />
            </div>
            <div class="flex mt-[20rem] justify-between gap-[10rem]">
                <div class="w-[550rem]">
                <span class="text-[8rem] text-neutral-400 w-full"
                    >© 2022 Whitelabel Solutions, Inc. Powered by Piet Mondrian.</span
                >
                </div>
                <div class="flex items-start gap-[8rem]">
                <!-- <img src="./favicon.svg" alt="" class="aspect-square w-[20rem]" /> -->
                <svg
                    version="1.0"
                    id="Ebene_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 32 32"
                    style="enable-background: new 0 0 32 32"
                    xml:space="preserve"
                    class="aspect-square w-[70rem]"
                >
                    <style type="text/css">
                    .st0 {
                        fill: #e10e24;
                    }
                    .st1 {
                        fill: #fadc48;
                    }
                    .st2 {
                        fill: #4481c3;
                    }
                    .st3 {
                        fill: #010202;
                    }
                    </style>
                    <rect x="2" y="2" class="st0" width="13" height="13" />
                    <rect x="2" y="17" class="st1" width="13" height="13" />
                    <rect x="17" y="2" class="st2" width="13" height="28" />
                    <rect x="15" class="st3" width="2" height="32" />
                    <rect y="15" class="st3" width="15" height="2" />
                    <rect class="st3" width="2" height="32" />
                    <rect x="2" y="30" class="st3" width="30" height="2" />
                    <rect x="2" class="st3" width="30" height="2" />
                    <rect x="30" y="2" class="st3" width="2" height="28" />
                </svg>
                <span class="text-[8rem] leading-none"
                    >Mondrians is a drop of custom digital paintings, created by Piet
                    Mondrian, aiming to express culture, uniqueness and creativity.
                    Through size, shape and color Mondrian's embraces what it means to
                    be on the common ground but having a sense of uniqueness.</span
                >
                </div>
            </div>
            </div>
        </div>
        </body>
    </html>
    `);
};

/**
 * creates a new poster
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {HTML} - new poster
 */
export const createPrintOrder = async (req, res, config) => {
  const { street, name, email, city, zipCode, country, countryCode } = req.body;
  const { accessToken } = req;
  const address = accessToken.sub;

  if (!fs.existsSync(path.join(__dirname, "../../screenshots"))) {
    fs.mkdirSync(path.join(__dirname, "../../screenshots"));
  }

  let browser = null;

  try {
    // launch headless Chromium browser
    browser = await puppeteer.launch({ headless: true });

    // create new page object
    const page = await browser.newPage();

    // set viewport width and height
    await page.setViewport({
      width: 7086,
      height: 9448,
    });

    await page.goto(
      `http://localhost:${
        process.env.NODE_ENV === "development" ? "3000" : "8080"
      }/api/print/poster?address=${address}`,
      { waitUntil: "networkidle0" }
    );

    // capture screenshot and store it into screenshots directory.
    const fileName = `${address}_${new Date()
      .toISOString()
      .replaceAll(":", "_")
      .replaceAll(".", "_")}.jpeg`;

    const image = await page.screenshot({
      path: path.join(__dirname, `../../screenshots/${fileName}`),
    });

    // set image density from 72 dpi to 300 dpi for print
    const data = await sharp(image).withMetadata({ density: 300 }).toBuffer();

    fs.writeFile(
      path.join(__dirname, `../../screenshots/${fileName}`),
      data,
      (err) => {
        if (err) return console.error(err);
      }
    );

    const { data: order } = await api.post("/Orders", {
      merchantReference: "Mondrian",
      shippingMethod: "Standard",
      recipient: {
        address: {
          line1: street,
          postalOrZipCode: zipCode,
          countryCode: countryCode,
          townOrCity: city,
          stateOrCounty: country,
        },
        name,
        email,
      },
      items: [
        {
          merchantReference: "item #1",
          sku: "ART-FAP-MFA-24X32", // Budget Art Paper: ART-FAP-BAP-24X32, Smooth Art Paper: ART-FAP-SAP-24X32
          copies: 1,
          sizing: "fillPrintArea",
          assets: [
            {
              printArea: "Default",
              url:
                process.env.NODE_ENV === "development"
                  ? `http://localhost:3000/screenshots/${fileName}?apikey=${process.env.PRINT_KEY}`
                  : `https://api.whitelabel-market.com/screenshots/${fileName}?apikey=${process.env.PRINT_KEY}`,
            },
          ],
        },
      ],
    });

    await browser.close();
    logger.info(`Order successfully created for address: ${address}`);

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
};
