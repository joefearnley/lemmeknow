'use strict';

const cheerio = require('cheerio');
const Mailgun = require('mailgun-js');
const dateFormat = require('dateformat');
const phantom = require('phantom');
const url = 'https://www.packtpub.com/free-learning';

require('dotenv').config();

const formatMessageData = title => {
    const body = `
        <h3>PacktPub Daily Free eBook</h3>
        <p>The title of the free book today is <strong>${title}</strong></p>
        <p> Check it out here: ${url}</p>
    `;

    const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy");
    const subject = `PackPub Free Book of the Day for ${date}`;

    return {
        title,
        body,
        subject
    };
}

const sendMail = args => {
    const mailgun = new Mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    const data = {
        from: process.env.MAILGUN_FROM,
        to: process.env.MAILGUN_TO,
        subject: args.subject,
        html: args.body
    };

    mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.log(`Got an error trying to send email: ${error}`);
            return;
        }

        console.log('Mail successfully sent!');
    });
}

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open(url);
    const content = await page.property('content');

    const $ = cheerio.load(content);
    const title = $('.product-info__content > .product-info__title')
        .html()
        .replace('Free eBook - ','');

    if (title === null || title.trim() === '') {
        console.log('No title found today, exiting.');
        return false;
    }

     sendMail(formatMessageData(title));

    await page.close();
    await instance.exit();
}());
