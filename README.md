# lemmeknow
Let me know what the free book is today. Scrape [Packt Pub's free learning page](https://www.packtpub.com/packt/offers/free-learning) and email me the details.

# Usage
>$ node app

Set it up to run via a cron job or whatever your platform's job scheduler is. 

## Heroku & Mailgun
If you don't have a server you can run it using Heroku and Mailgun both on a free tier.

* Sign up for a free dyno on Heroku.
* Sign up for a free Mailgun account.
* Configure the following variables in Heroku:
  * MAILGUN_API_KEY
  * MAILGUN_DOMAIN
  * MAILGUN_FROM
  * MAILGUN_TO
* Deploy this code to Heroku.
* Add on the [Heroku Scheduler](https://elements.heroku.com/addons/scheduler) and set it up to run once a day.


