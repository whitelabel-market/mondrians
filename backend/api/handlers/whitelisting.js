import { ethers } from "ethers";
import { signWhitelist } from "../../utils/voucher.js";
import { logger } from "../../logger/index.js";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
import pkg from "passkit-generator";
const { PKPass } = pkg;
import CONFIG from "../../../config.js";

/**
 * returns a voucher for whitelist sale
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 * @returns {String} - voucher
 */
export const getVoucher = async (req, res, config) => {
  try {
    const { accessToken } = req;
    const address = accessToken.sub;
    logger.info(`Received voucher request from address: ${address}`);

    const signer = new ethers.Wallet(CONFIG.whitelisting.signerPkey);
    const voucher = await signWhitelist(
      CONFIG.chainId,
      CONFIG.contract,
      signer,
      address
    );
    res.status(200).json({ signature: voucher });
  } catch (e) {
    logger.error(e.toString());
    return res.status(400).json(e.toString());
  }
};

/**
 * sends email after successful purchase of nft
 *
 * @param {Object} req - express request object
 * @param {Object} res - express request object
 */
export const getMail = async (req, res, config) => {
  try {
    const { accessToken } = req;

    const address = accessToken.sub;

    const { email } = req.body;

    if (!email) throw "Missing email address";

    let transporter = nodemailer.createTransport({
      host: CONFIG.email.host,
      port: CONFIG.email.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: CONFIG.email.address, // generated ethereal user
        pass: CONFIG.email.password, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const qrCode = await QRCode.toDataURL(address, {
      type: "image/png",
      quality: 1,
      width: 800,
    });

    let mailOptions = {
      from: `"Whitelabel Solutions" <${CONFIG.email.address}>`, // sender address
      to: email, // list of receivers
      subject: "Magic Mondrian Order Confirmation", // Subject line
      attachments: [
        {
          filename: "qrcode.png",
          path: qrCode,
          cid: "qrcode",
        },
      ],
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
        <body style="word-break:break-word;-webkit-font-smoothing:antialiased;margin:0;width:100%;background-color:#fff;padding:0"><div style="display:none"> This is your ticket for the Magic Mondrian Launch Event &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; </div><div role="article" aria-roledescription="email" aria-label="Order Confirmation" lang="en">
        <style>
        @media screen{@font-face{font-family:"Inter var";font-weight:100 900;font-style:normal;font-named-instance:"Regular";font-display:swap;src:url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2 supports variations(gvar)"),url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2-variations"),url("Inter (web)/Inter-roman.var.woff2?v=3.19") format("woff2");}}
        </style>
        <table class="t" style="width:100%;font-family:'Inter',-apple-system,'Segoe UI',sans-serif" cellpadding="0" cellspacing="0" role="presentation"><tr><td align="center" style="background-color:#fff">
        <table class="e" style="width:600px" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:48px;text-align:center"> <a href="${CONFIG.hostUrl}"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="0 0 32 32" style="enable-background:new 0 0 32 32;aspect-ratio:1 / 1;width:80px" xml:space="preserve"><rect x="2" y="2" width="13" height="13" style="fill:#e10e24"></rect><rect x="2" y="17" width="13" height="13" style="fill:#fadc48"></rect><rect x="17" y="2" width="13" height="28" style="fill:#4481c3"></rect><rect x="15" width="2" height="32" style="fill:#010202"></rect><rect y="15" width="15" height="2" style="fill:#010202"></rect><rect width="2" height="32" style="fill:#010202"></rect><rect x="2" y="30" width="30" height="2" style="fill:#010202"></rect><rect x="2" width="30" height="2" style="fill:#010202"></rect><rect x="30" y="2" width="2" height="28" style="fill:#010202"></rect></svg></a>
        </td></tr><tr><td align="center" class="w8">
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td class="q" style="border-radius:4px;background-color:#fff;padding:48px;text-align:left;font-size:16px;line-height:24px;color:#334155;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)"><p style="margin:0;margin-bottom:16px">Hello,</p><p style="margin:0;margin-bottom:16px"> You are now owner of a Magic Mondrian NFT. This is a ticket for the </p><p class="w" style="margin:0;margin-bottom:16px;font-size:24px;font-weight:600;color:#000"> Magic Mondrian Launch Event </p><p style="margin:0;margin-bottom:24px"> on Saturday, 5th of January 2022 at Bohnsdorfer Weg 129, 12524 Berlin. </p><p style="margin:0;margin-bottom:16px"> Please use the following QR Code to check in during the event. </p><div style="margin-bottom:16px;text-align:center;line-height:100%"> <img src="cid:qrcode" width="75%" alt="QR Code" style="border:0;max-width:100%;vertical-align:middle"></div><div style="margin:0;margin-bottom:16px;text-align:center;line-height:100%"> <a href="${CONFIG.backend.url}/v1/whitelist/pass?address=${address}"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Add_to_Apple_Wallet_badge.svg/512px-Add_to_Apple_Wallet_badge.svg.png" width="50%" alt="Add to Apple Wallet" style="border:0;max-width:100%;vertical-align:middle"> </a></div><p> To add this pass to Wallet, open this email on your iPhone. </p>
        <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding-top:32px;padding-bottom:32px"><div style="height:1px;background-color:#e2e8f0;line-height:1px"> &zwnj; </div>
        </td></tr></table><p style="margin:0;margin-bottom:16px;color:#334155"> If you are not the receiver of this mail, you can safely ignore it. </p><p style="margin:0;margin-bottom:16px;color:#334155"> Thanks, <br>The Whitelabel Solutions Team </p>
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
  } catch (e) {
    logger.error(e.toString());
    return res.status(400).send(e.toString());
  }
};

const add_minutes = function (dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
};

export const getPass = async (req, res, config) => {
  try {
    const { address } = req.query;
    if (!address) throw "Missing address in query";

    const examplePass = await PKPass.from(
      {
        model: "./MAMO.pass",
        certificates: {
          wwdr: CONFIG.appleWallet.wwdrCert.replace(/\\n/g, "\n"),
          signerCert: CONFIG.appleWallet.signerCert.replace(/\\n/g, "\n"),
          signerKey: CONFIG.appleWallet.signerKey.replace(/\\n/g, "\n"),
          signerKeyPassphrase: CONFIG.appleWallet.passPhrase,
        },
      },
      {
        serialNumber:
          Math.random().toString(36).substring(7) +
          Math.random().toString(36).substring(7),
        sharingProhibited: true,
      }
    );

    examplePass.secondaryFields.push({
      value: `${address.substring(0, 5)}...${address.substring(
        address.length - 5,
        address.length
      )}`,
      label: "Guest",
      key: "guest",
    });

    examplePass.setBarcodes({
      message: address,
      format: "PKBarcodeFormatQR",
    });

    // TODO: set correct date
    examplePass.setExpirationDate(add_minutes(new Date(), 60 * 24 * 7));
    examplePass.setRelevantDate(add_minutes(new Date(), 30));

    examplePass.setLocations({
      latitude: 52.40607,
      longitude: 13.5513,
    });

    res.set({
      "Content-type": "application/vnd.apple.pkpass",
      "Content-disposition": "attachment; filename=magicmondrian.pkpass",
    });

    const passStream = examplePass.getAsStream();
    const watchdog = passStream.pipe(res);

    watchdog.on("finish", () => {
      res.end();
    });
  } catch (err) {
    return res.status(400).send(err.toString());
  }
};
