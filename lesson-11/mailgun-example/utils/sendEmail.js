import formData from "form-data";
import Mailgun from "mailgun.js";
import "dotenv/config";

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

/*
const data = {
  to: ["xocir12840@fenxz.com"],
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
  html: "<h1>Testing some Mailgun awesomness!</h1>",
};
*/

export const sendEmail = data => {
    const email = {...data, from: "Bogdan Lyamzin bogdan.lyamzin.d@gmail.com"};
    return client.messages.create(process.env.MAILGUN_DOMAIN, email);
}