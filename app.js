var request = require('request');
var cheerio = require('cheerio');
var Mailgun = require('mailgun-js');
var dateFormat = require('dateformat');

require('dotenv').config();

var url = 'https://www.packtpub.com/packt/offers/free-learning';

request(url, processResponse);


function processResponse(error, response, html) {
    if (!error) {
        var $ = cheerio.load(html);
        var title = $('.dotd-title > h2').html();
    }    
}

function sendMail(title) {
    var mailgun = new Mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    var now = new Date();
    var date = dateFormat(now, "dddd, mmmm dS, yyyy");
    
    var body = '<h3> PackPub Free Book of the Day</h3>' + 
        '<p>The title of the free book today is <strong>' +
        title + '</strong> </p> <p> Check it out here: ' + url;

    var data = {
        from: process.env.MAILGUN_FROM,
        to: process.env.MAILGUN_TO,
        subject: 'PackPub Free Book of the Day for ' + date,
        html: body
    };

    mailgun.messages().send(data, function(error, body) {
        if (error) {
            console.log('Got an error trying to send email: ', error);
        } else {
            console.log('Mail successfully sent!');
        }
    });
}