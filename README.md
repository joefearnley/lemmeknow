# lemmeknow
Let me know what the free book is today

# Usage
* Sign up for a free dyno on Heroku.
* Sign up for a free Mailgun account.
* Configure the following variables in Heroku:
  * MAILGUN_API_KEY
  * MAILGUN_DOMAIN
  * MAILGUN_FROM
  * MAILGUN_TO

* Add on the [Heroku Scheduler] (https://elements.heroku.com/addons/scheduler) and set it up to run the following once a day:

>$ node app
