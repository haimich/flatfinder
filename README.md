# flatfinder
![Logo](logo.png)

This Node.js tool regularly scrapes sites where flats are offered to buy.

Flatfinder makes use of the [Mailgun API](https://mailgun.com/) in order to send mails with new offers. You need to have an account in order to use this functionality.
Your account data have to be passed in as environment variables:

```bash
mailgun_url      // eg. https://api.mailgun.net/v3/yourdomain.mailgun.org/messages
mailgun_user     // eg. api
mailgun_key      // eg. key-asd213102ad
mailgun_to       // eg. mrdeveloper@web.de
```