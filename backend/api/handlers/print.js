import QRCode from "qrcode";
import { logger } from "../../logger/index.js";
import sharp from "sharp";
import fs from "fs";
import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import nodemailer from "nodemailer";

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

export const sendEmailUpdate = async (req, res, config) => {
  console.log(req.body);
  return res.status(200).json("ok");
};

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
                        >${address.substring(0, 6)}...${address.substring(
    address.length - 5,
    address.length
  )}</span
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
  const { street, name, email, city, zipCode, country, token } = req.body;
  const { accessToken } = req;
  const address = accessToken.sub;

  if (!token.hasOwnProperty("id"))
    return res.status(400).json("Invalid request body");

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

    // create order at prodigi
    const { data: order } = await api.post("/Orders", {
      merchantReference: "Mondrian",
      shippingMethod: "Standard",
      callbackUrl: "https://6214-158-181-79-253.ngrok.io/api/print/update",
      recipient: {
        address: {
          line1: street,
          postalOrZipCode: zipCode,
          countryCode: country.code,
          townOrCity: city,
          stateOrCounty: country.name,
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
              url: "https://www.collinsdictionary.com/images/full/dog_230497594.jpg",
              // process.env.NODE_ENV === "development"
              //   ? `http://localhost:3000/screenshots/${fileName}?apikey=${process.env.PRINT_KEY}`
              //   : `https://api.whitelabel-market.com/screenshots/${fileName}?apikey=${process.env.PRINT_KEY}`,
            },
          ],
        },
      ],
    });
    console.log(order);

    await browser.close();
    logger.info(`Order successfully created for address: ${address}`);

    //return res.status(200).json(order);

    let transporter = nodemailer.createTransport({
      host: "securesmtp.t-online.de",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "kevin.hertwig@t-online.de", // generated ethereal user
        pass: process.env.EMAIL_PW, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: '"Whitelabel Solutions" <kevin.hertwig@t-online.de>', // sender address
      to: email, // list of receivers
      subject: "Order Confirmation", // Subject line
      html: `
        <!DOCTYPE html>
        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <!--[if mso]> <noscript><xml><o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office"><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
        <style>td,th,div,p,a,h1,h2,h3,h4,h5,h6{font-family:"Segoe UI",sans-serif;mso-line-height-rule:exactly;}
        </style><![endif]-->
        <title>Order Confirmation</title>
        <style>.o:hover{text-decoration:underline;}
        @media screen{.t{font-family:"Inter",-apple-system,"Segoe UI",sans-serif!important;}}
        @media (max-width:600px){.e{width:100%!important;}.w8{padding-left:24px!important;padding-right:24px!important;}.q{padding-left:0!important;padding-right:0!important;}.w{line-height:32px!important;}}
        </style></head>
        <body style="word-break:break-word;-webkit-font-smoothing:antialiased;margin:0;width:100%;background-color:#fff;padding:0"><div style="display:none"> We're on it. This is just a quick email to say we've received your order. &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; </div><div role="article" aria-roledescription="email" aria-label="Order Confirmation" lang="en">
        <style>
        @media screen{@font-face{font-family:"Inter var";font-weight:100 900;font-style:normal;font-named-instance:"Regular";font-display:swap;src:url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2 supports variations(gvar)"),url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2-variations"),url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2");}}
        </style>
        <table class="t" style="width:100%;font-family:'Inter',-apple-system,'Segoe UI',sans-serif" cellpadding="0" cellspacing="0" role="presentation"><tr><td align="center" style="background-color:#fff">
        <table class="e" style="width:600px" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:48px;text-align:center"> <a href="https://magic-mondrian.netlify.com"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 32 32" style="enable-background:new 0 0 32 32;aspect-ratio:1 / 1;width:80px" xml:space="preserve"><rect x="2" y="2" width="13" height="13" style="fill:#e10e24"></rect><rect x="2" y="17" width="13" height="13" style="fill:#fadc48"></rect><rect x="17" y="2" width="13" height="28" style="fill:#4481c3"></rect><rect x="15" width="2" height="32" style="fill:#010202"></rect><rect y="15" width="15" height="2" style="fill:#010202"></rect><rect width="2" height="32" style="fill:#010202"></rect><rect x="2" y="30" width="30" height="2" style="fill:#010202"></rect><rect x="2" width="30" height="2" style="fill:#010202"></rect><rect x="30" y="2" width="2" height="28" style="fill:#010202"></rect></svg></a>
        </td></tr><tr><td align="center" class="w8">
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="border-radius:4px;background-color:#fff;padding:48px;text-align:left;font-size:16px;line-height:24px;color:#334155"><p class="w" style="margin:0;margin-bottom:24px;font-size:24px;font-weight:600;color:#000"> We're on it. </p><p style="margin:0;margin-bottom:16px">Hey ${name},</p><p style="margin:0;margin-bottom:16px"> This is just a quick email to say we've received your order. </p><p style="margin:0;margin-bottom:16px"> Once everything is confirmed and ready to ship, we'll send you another email with the tracking details and any other information about your package. </p><p style="margin:0"> In the meantime, if you have any questions, send us an email at <a href="mailto:support@mondrian.com">support@mondrian.com</a> and we'll be happy to help. </p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:32px;padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table><p class="w" style="margin:0;margin-bottom:32px;font-size:24px;font-weight:600;color:#000"> Order ${
          order.order.id.split("_")[1]
        } summary </p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="text-align:left;font-size:16px;line-height:24px;color:#334155"> <a href="https://6214-158-181-79-253.ngrok.io/screenshots/0x48a51d51fe0a28329adb220982446d4ef1da75f9_2022-07-14T21_29_50_489Z.jpeg?apikey=f98722aa-2fc1-4627-bba1-c7697f01ea87" target="_blank"> <img src="https://6214-158-181-79-253.ngrok.io/screenshots/0x48a51d51fe0a28329adb220982446d4ef1da75f9_2022-07-14T21_29_50_489Z.jpeg?apikey=f98722aa-2fc1-4627-bba1-c7697f01ea87" alt="NFT Poster" style="width:40px"></a>
        </td><td style="width:100%;text-align:left"> <span style="margin-left:16px;font-size:16px;font-weight:600;line-height:24px;color:#000">Magic Mondrian #0001</span>
        </td><td style="text-align:right"><div style="display:flex;align-items:center"> <svg viewbox="0 0 33 53" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;width:12px"><path d="M16.8498 0.666687L16.4974 1.85009V36.1896L16.8498 36.5371L32.9842 27.115L16.8498 0.666687Z" fill="#8247E5"></path><path d="M16.85 0.666687L0.715599 27.115L16.85 36.5372V19.8699V0.666687Z" fill="#B591F0"></path><path d="M16.8497 39.5552L16.6511 39.7944V52.0268L16.8497 52.6L32.9937 30.1378L16.8497 39.5552Z" fill="#8247E5"></path><path d="M16.85 52.5998V39.5551L0.715599 30.1377L16.85 52.5998Z" fill="#B591F0"></path><path d="M16.8497 36.537L32.9838 27.1151L16.8497 19.8699V36.537Z" fill="#3C1281"></path><path d="M0.715599 27.1151L16.8497 36.537V19.8699L0.715599 27.1151Z" fill="#8247E5"></path></svg> <span>50</span></div>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:8px;padding-bottom:16px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table>
        <table style="width:100%;text-align:right" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td class="q" style="width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-size:16px;font-weight:600;line-height:24px;color:#000"> Subtotal </p>
        </td><td style="text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <svg viewbox="0 0 33 53" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;width:12px"><path d="M16.8498 0.666687L16.4974 1.85009V36.1896L16.8498 36.5371L32.9842 27.115L16.8498 0.666687Z" fill="#8247E5"></path><path d="M16.85 0.666687L0.715599 27.115L16.85 36.5372V19.8699V0.666687Z" fill="#B591F0"></path><path d="M16.8497 39.5552L16.6511 39.7944V52.0268L16.8497 52.6L32.9937 30.1378L16.8497 39.5552Z" fill="#8247E5"></path><path d="M16.85 52.5998V39.5551L0.715599 30.1377L16.85 52.5998Z" fill="#B591F0"></path><path d="M16.8497 36.537L32.9838 27.1151L16.8497 19.8699V36.537Z" fill="#3C1281"></path><path d="M0.715599 27.1151L16.8497 36.537V19.8699L0.715599 27.1151Z" fill="#8247E5"></path></svg> <span>50</span></p>
        </td></tr><tr><td style="margin-bottom:16px;width:50%">
        </td><td class="q" style="margin-bottom:16px;width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping </p>
        </td><td style="margin:0;margin-bottom:16px;text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <svg viewbox="0 0 33 53" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;width:12px"><path d="M16.8498 0.666687L16.4974 1.85009V36.1896L16.8498 36.5371L32.9842 27.115L16.8498 0.666687Z" fill="#8247E5"></path><path d="M16.85 0.666687L0.715599 27.115L16.85 36.5372V19.8699V0.666687Z" fill="#B591F0"></path><path d="M16.8497 39.5552L16.6511 39.7944V52.0268L16.8497 52.6L32.9937 30.1378L16.8497 39.5552Z" fill="#8247E5"></path><path d="M16.85 52.5998V39.5551L0.715599 30.1377L16.85 52.5998Z" fill="#B591F0"></path><path d="M16.8497 36.537L32.9838 27.1151L16.8497 19.8699V36.537Z" fill="#3C1281"></path><path d="M0.715599 27.1151L16.8497 36.537V19.8699L0.715599 27.1151Z" fill="#8247E5"></path></svg> <span>0</span></p>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td style="width:50%;padding-bottom:16px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table>
        <table style="width:100%;text-align:right" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td class="q" style="width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-size:16px;font-weight:600;line-height:24px;color:#000"> Total </p>
        </td><td style="text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <svg viewbox="0 0 33 53" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:8px;width:12px"><path d="M16.8498 0.666687L16.4974 1.85009V36.1896L16.8498 36.5371L32.9842 27.115L16.8498 0.666687Z" fill="#8247E5"></path><path d="M16.85 0.666687L0.715599 27.115L16.85 36.5372V19.8699V0.666687Z" fill="#B591F0"></path><path d="M16.8497 39.5552L16.6511 39.7944V52.0268L16.8497 52.6L32.9937 30.1378L16.8497 39.5552Z" fill="#8247E5"></path><path d="M16.85 52.5998V39.5551L0.715599 30.1377L16.85 52.5998Z" fill="#B591F0"></path><path d="M16.8497 36.537L32.9838 27.1151L16.8497 19.8699V36.537Z" fill="#3C1281"></path><path d="M0.715599 27.1151L16.8497 36.537V19.8699L0.715599 27.1151Z" fill="#8247E5"></path></svg> <span>50</span></p>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table><p style="margin:0;margin-bottom:16px;font-size:16px;font-weight:600;line-height:24px;color:#000"> Customer Information </p><p style="margin:0;margin-bottom:4px;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping address </p><p style="margin:0;font-size:16px;line-height:24px;color:#000"> ${name} </p><p style="margin:0;font-size:16px;line-height:24px;color:#000"> ${street} </p><p style="margin:0;font-size:16px;line-height:24px;color:#000"> ${zipCode} ${city} </p><p style="margin:0;margin-bottom:16px;font-size:16px;line-height:24px;color:#000"> ${
        country.name
      } </p><p style="margin:0;margin-bottom:4px;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping Method </p><p style="margin:0;font-size:16px;line-height:24px;color:#000">Standard</p>
        </td></tr><tr><td style="height:48px">
        </td></tr><tr><td style="padding-left:24px;padding-right:24px;text-align:center;font-size:12px;color:#475569"><p style="margin:0;margin-bottom:16px;font-size:12px;line-height:1.625"> © 2022 Whitelabel Solutions, Inc. Powered by Piet Mondrian. </p><p style="cursor:default"> <a href="https://maizzle.com/docs/" class="o" style="text-decoration:none;color:#4481c3">Opensea</a> &bull; <a href="https://github.com/maizzle" class="o" style="text-decoration:none;color:#4481c3">Discord</a> &bull; <a href="https://twitter.com/maizzlejs" class="o" style="text-decoration:none;color:#4481c3">Twitter</a></p>
        </td></tr></table>
        </td></tr></table>
        </td></tr></table></div>
        </body>
        </html>
        `,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.end();
    });
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
};
