'use strict';

const request = require('request');
const cheerio = require('cheerio');
const Mailgun = require('mailgun-js');
const dateFormat = require('dateformat');
const url = 'https://www.packtpub.com/packt/offers/free-learning';

require('dotenv').config();

request(url, processResponse);

function processResponse(error, response, html) {

    if (!error) {
        const $ = cheerio.load(html);
        const title = $('.dotd-title > h2').html();

        if (title === null) {
            console.log('No title found today, exiting.');
            return false;
        }

        sendMail(formatMessageData(title));

        return true;
    }

    console.error('Got an error processing response: ', error);
}

function formatMessageData(title) {
    const body = `
        <h3> PackPub Free Book of the Day</h3>
        <p>The title of the free book today is <strong>${title}</strong></p>
        <p> Check it out here: ${url}
    `;

    const subject = `PackPub Free Book of the Day for ${dateFormat(new Date(), "dddd, mmmm dS, yyyy")}`;

    return {
        title: title,
        body: body,
        subject: subject
    };
}

function sendMail(args) {
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
            console.log('Got an error trying to send email: ', error);
        } else {
            console.log('Mail successfully sent!');
        }
    });
}
