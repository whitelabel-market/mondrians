import { logger } from "../../logger/index.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import nodemailer from "nodemailer";
import CONFIG from "../../../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
};

const api = axios.create({
  baseURL: CONFIG.prodigi.apiBaseUrl,
  headers: {
    "X-API-Key": CONFIG.prodigi.apiKey,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const sendEmailUpdate = async (req, res, config) => {
  const order = req.body;

  if (order?.data?.order?.status?.details?.shipping === "Complete") {
    let transporter = nodemailer.createTransport({
      host: CONFIG.email.host,
      port: CONFIG.email.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: CONFIG.email.address,
        pass: CONFIG.email.password,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let mailOptions = {
      from: `"Decentum" <${CONFIG.email.address}>`, // sender address
      to: order.data.order.recipient.email, // list of receivers
      subject: `Your order #${
        order.data.order.id.split("_")[1]
      } has been shipped`, // Subject line
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
        <title>Your order #1067707 has been shipped</title>
        <style>.o:hover{text-decoration:underline;}
        @media screen{.t{font-family:"Inter",-apple-system,"Segoe UI",sans-serif!important;}}
        @media (max-width:600px){.e{width:100%!important;}.w8{padding-left:24px!important;padding-right:24px!important;}.q{padding-left:0!important;padding-right:0!important;}.w{line-height:32px!important;}}
        </style></head>
        <body style="word-break:break-word;-webkit-font-smoothing:antialiased;margin:0;width:100%;background-color:#fff;padding:0"><div style="display:none"> We're on it. This is just a quick email to say we've received your order. &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; </div><div role="article" aria-roledescription="email" aria-label="Your order #1067707 has been shipped" lang="en">
        <style>
        @media screen{@font-face{font-family:"Inter var";font-weight:100 900;font-style:normal;font-named-instance:"Regular";font-display:swap;src:url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2 supports variations(gvar)"),url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2-variations"),url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2");}}
        </style>
        <table class="t" style="width:100%;font-family:'Inter',-apple-system,'Segoe UI',sans-serif" cellpadding="0" cellspacing="0" role="presentation"><tr><td align="center" style="background-color:#fff">
        <table class="e" style="width:600px" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:48px;text-align:center"> <a href="${CONFIG.hostUrl}"> <img src="https://i.ibb.co/YjCfSWH/logo.png" alt="logo" border="0" style="width:80px"></a>
        </td></tr><tr><td align="center" class="w8">
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="border-radius:4px;background-color:#fff;padding:48px;text-align:left;font-size:16px;line-height:24px;color:#334155"><p class="w" style="margin:0;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:24px;font-weight:600;color:#000"> Your order is on its way! </p><p style="margin:0;margin-bottom:24px;text-align:left;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155"> You can find the shipping details below. </p><p style="text-align:center"> <a href="${order.data.order.shipments[0].tracking.url}" target="_blank" style="border:0;margin-left:auto;margin-right:auto;border-radius:6px;border-width:0px;background-color:#4481c3;padding-left:16px;padding-right:16px;padding-top:10px;padding-bottom:10px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:14px;font-weight:600;color:#fff;text-decoration-line:none"> Track package </a></p><p style="margin:0;margin-bottom:16px;text-align:left;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155"> Please note, it may take up to 24hrs for tracking to become available. </p><p style="margin:0;text-align:center;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-weight:600"> Tracking Number </p><p style="margin:0;text-align:center"> <a target="_blank" href="${order.data.order.shipments[0].tracking.url}" style="font-family:'Inter',-apple-system,'Segoe UI',sans-serif;text-decoration-line:none">${order.data.order.shipments[0].tracking.number}</a></p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:32px;padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table><p class="w" style="margin:0;margin-bottom:32px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:24px;font-weight:600;color:#000"> Order 1067707 summary </p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="text-align:left;font-size:16px;line-height:24px;color:#334155"> <a href="${order.data.order.items[0].thumbnailUrl}" target="_blank"> <img src="${order.data.order.items[0].thumbnailUrl}" alt="NFT Poster" style="width:40px"></a>
        </td><td style="width:100%;text-align:left"> <span style="margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000">Magic Mondrian #${order.data.order.metadata.assetId}</span>
        </td><td style="text-align:right"><div style="display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155;--tw-space-x-reverse:0;margin-right:calc(8px * var(--tw-space-x-reverse));margin-left:calc(8px * calc(1 - var(--tw-space-x-reverse)));">40</span></div>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:8px;padding-bottom:16px"><div style="height:1px;background-color:#e2e8f0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;line-height:1px"> &zwnj; </div>
        </td></tr></table>
        <table style="width:100%;text-align:right" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td class="q" style="width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Subtotal </p>
        </td><td style="text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155;--tw-space-x-reverse:0;margin-right:calc(8px * var(--tw-space-x-reverse));margin-left:calc(8px * calc(1 - var(--tw-space-x-reverse)));">40</span></p>
        </td></tr><tr><td style="margin-bottom:16px;width:50%">
        </td><td class="q" style="margin-bottom:16px;width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping </p>
        </td><td style="margin:0;margin-bottom:16px;text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155;--tw-space-x-reverse:0;margin-right:calc(8px * var(--tw-space-x-reverse));margin-left:calc(8px * calc(1 - var(--tw-space-x-reverse)));">0</span></p>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td style="width:50%;padding-bottom:16px"><div style="height:1px;background-color:#e2e8f0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;line-height:1px"> &zwnj; </div>
        </td></tr></table>
        <table style="width:100%;text-align:right" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td class="q" style="width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Total </p>
        </td><td style="text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155;--tw-space-x-reverse:0;margin-right:calc(8px * var(--tw-space-x-reverse));margin-left:calc(8px * calc(1 - var(--tw-space-x-reverse)));">40</span></p>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;line-height:1px"> &zwnj; </div>
        </td></tr></table><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Customer Information </p><p style="margin:0;margin-bottom:4px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping address </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${order.data.order.recipient.name} </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${order.data.order.recipient.address.line1} </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${order.data.order.recipient.address.postalOrZipCode} ${order.data.order.recipient.address.townOrCity} </p><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${order.data.order.recipient.address.stateOrCounty} </p><p style="margin:0;margin-bottom:4px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping Method </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> Standard </p>
        </td></tr><tr><td style="height:48px">
        </td></tr><tr><td style="padding-left:24px;padding-right:24px;text-align:center;font-size:12px;color:#475569"><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:12px;line-height:1.625"> © 2022 Decentum, Inc. Powered by Piet Mondrian. </p><p style="cursor:default"> <a href="https://maizzle.com/docs/" class="o" style="text-decoration:none;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#4481c3">Opensea</a> &bull; <a href="https://github.com/maizzle" class="o" style="text-decoration:none;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#4481c3">Discord</a> &bull; <a href="https://twitter.com/maizzlejs" class="o" style="text-decoration:none;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#4481c3">Twitter</a></p>
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
      return res.end();
    });
  }

  return res.status(200).send();
};

/**
 * creates a new poster
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {HTML} - new poster
 */
export const createPrintOrder = async (req, res, config) => {
  req.setTimeout(60000);
  const { street, name, email, city, zipCode, country, token } = req.body;
  const { accessToken } = req;
  const address = accessToken.sub;

  if (!token.hasOwnProperty("id"))
    return res.status(400).json("Invalid request body");

  if (!fs.existsSync(path.join(__dirname, "../../screenshots"))) {
    fs.mkdirSync(path.join(__dirname, "../../screenshots"));
  }

  try {
    // capture screenshot and store it into screenshots directory.
    const fileName = `${address}_${token.id}_${new Date()
      .toISOString()
      .replaceAll(":", "_")
      .replaceAll(".", "_")}.jpeg`;

    const image = await axios.get(
      `${CONFIG.screenshotUrl}/screenshot?url=${encodeURIComponent(
        `${CONFIG.hostUrl}/screenshot?mintAddress=${address}&tokenId=${token.id}&timestamp=${token.createdAtTimestamp}&url=${token.imageURI}`
      )}`,
      {
        responseType: "arraybuffer",
      }
    );

    // set image density from 72 dpi to 300 dpi for print
    const data = await sharp(image.data)
      .withMetadata({ density: 300 })
      .toBuffer();

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
      callbackUrl: CONFIG.prodigi.callbackUrl,
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
          sku: "ART-FAP-BAP-24X32", // Museum Fine Art Paper: ART-FAP-MFA-24X32, Budget Art Paper: ART-FAP-BAP-24X32, Smooth Art Paper: ART-FAP-SAP-24X32
          copies: 1,
          sizing: "fillPrintArea",
          assets: [
            {
              printArea: "Default",
              url:
                CONFIG.prodigi.assetBaseUrl +
                `${fileName}?apikey=${CONFIG.backend.apiKey}`,
              //url: `https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80`,
            },
          ],
        },
      ],
      metadata: {
        blockchainAddress: address,
        assetId: ("0000" + token.id).substr(token.id.toString().length),
        date: formatDate(new Date(token.createdAtTimestamp * 1000)),
      },
    });

    // await browser.close();
    logger.info(`Order successfully created for address: ${address}`);

    let transporter = nodemailer.createTransport({
      host: CONFIG.email.host,
      port: CONFIG.email.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: CONFIG.email.address, // generated ethereal user
        pass: CONFIG.email.password, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    let mailOptions = {
      from: `"Decentum" <${CONFIG.email.address}>`, // sender address
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
        <table class="e" style="width:600px" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:48px;text-align:center"> <a href="${
          CONFIG.hostUrl
        }"> <img src="https://i.ibb.co/YjCfSWH/logo.png" alt="logo" border="0" style="width:80px"></a>
        </td></tr><tr><td align="center" class="w8">
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="border-radius:4px;background-color:#fff;padding:48px;text-align:left;font-size:16px;line-height:24px;color:#334155"><p class="w" style="margin:0;margin-bottom:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:24px;font-weight:600;color:#000"> We're on it. </p><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155"> Hey ${name}, </p><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155"> This is just a quick email to say we've received your order. </p><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155"> Once everything is confirmed and ready to ship, we'll send you another email with the tracking details and any other information about your package. </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155"> In the meantime, if you have any questions, send us an email at <a href="mailto:${
        CONFIG.supportEmail
      }">${CONFIG.supportEmail}</a> and we'll be happy to help. </p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:32px;padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table><p class="w" style="margin:0;margin-bottom:32px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:24px;font-weight:600;color:#000"> Order ${
          order.order.id.split("_")[1]
        } summary </p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="text-align:left;font-size:16px;line-height:24px;color:#334155"> <a href="${
          CONFIG.prodigi.assetBaseUrl
        }?apikey=${CONFIG.backend.apiKey}" target="_blank"> <img src="${
        CONFIG.prodigi.assetBaseUrl
      }?apikey=${
        CONFIG.backend.apiKey
      }" alt="NFT Poster" style="width:40px"></a>
        </td><td style="width:100%;text-align:left"> <span style="margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000">Magic Mondrian #${(
          "0000" + token.id
        ).substr(token.id.toString().length)}</span>
        </td><td style="text-align:right"><div style="display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="margin-left:8px;width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155">40</span></div>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:8px;padding-bottom:16px"><div style="height:1px;background-color:#e2e8f0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;line-height:1px"> &zwnj; </div>
        </td></tr></table>
        <table style="width:100%;text-align:right" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td class="q" style="width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Subtotal </p>
        </td><td style="text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="margin-left:8px;width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155">40</span></p>
        </td></tr><tr><td style="margin-bottom:16px;width:50%">
        </td><td class="q" style="margin-bottom:16px;width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping </p>
        </td><td style="margin:0;margin-bottom:16px;text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="margin-left:8px;width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155">0</span></p>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td style="width:50%;padding-bottom:16px"><div style="height:1px;background-color:#e2e8f0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;line-height:1px"> &zwnj; </div>
        </td></tr></table>
        <table style="width:100%;text-align:right" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width:50%">
        </td><td class="q" style="width:50%;text-align:left;font-size:16px;line-height:24px;color:#334155"><p style="margin:0;margin-bottom:16px;margin-left:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Total </p>
        </td><td style="text-align:right"><p style="margin:0;margin-bottom:16px;display:flex;align-items:center"> <img src="https://i.ibb.co/fGYSwr8/matic.png" alt="matic" border="0" style="width:12px"> <span style="margin-left:8px;width:24px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#334155">40</span></p>
        </td></tr></table>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;line-height:1px"> &zwnj; </div>
        </td></tr></table><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Customer Information </p><p style="margin:0;margin-bottom:4px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping address </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${name} </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${street} </p><p style="margin:0;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${zipCode} ${city} </p><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#000"> ${
        country.name
      } </p><p style="margin:0;margin-bottom:4px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:16px;font-weight:600;line-height:24px;color:#000"> Shipping Method </p><p style="margin:0;font-size:16px;line-height:24px;color:#000">Standard</p>
        </td></tr><tr><td style="height:48px">
        </td></tr><tr><td style="padding-left:24px;padding-right:24px;text-align:center;font-size:12px;color:#475569"><p style="margin:0;margin-bottom:16px;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:12px;line-height:1.625"> © 2022 Decentum, Inc. Powered by Piet Mondrian. </p><p style="cursor:default"> <a href="https://maizzle.com/docs/" class="o" style="text-decoration:none;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#4481c3">Opensea</a> &bull; <a href="https://github.com/maizzle" class="o" style="text-decoration:none;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#4481c3">Discord</a> &bull; <a href="https://twitter.com/maizzlejs" class="o" style="text-decoration:none;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;color:#4481c3">Twitter</a></p>
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

/**
 * returns all tokens that are already printed by an address
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {HTML} - new poster
 */
export const getPrintedTokens = async (req, res, config) => {
  const { accessToken } = req;
  const address = accessToken.sub;

  try {
    const dir = fs.readdirSync(path.join(__dirname, "../../screenshots/"));
    const files = dir.filter((file) =>
      file.toLowerCase().startsWith(`${address.toLowerCase()}`)
    );

    if (files.length)
      return res
        .status(200)
        .json({ tokens: files.map((file) => file.split("_")[1]) });
    else return res.status(204).send();
  } catch (e) {
    return res.status(400).send(e.toString());
  }
};
