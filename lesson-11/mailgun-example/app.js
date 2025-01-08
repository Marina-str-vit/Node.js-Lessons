import formData from "form-data";
import Mailgun from "mailgun.js";
import "dotenv/config";

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const email = {
  from: "Bogdan Lyamzin bogdan.lyamzin.d@gmail.com",
  to: ["xocir12840@fenxz.com"],
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
  html: "<h1>Testing some Mailgun awesomness!</h1>",
};

client.messages.create(process.env.MAILGUN_DOMAIN, email)
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
