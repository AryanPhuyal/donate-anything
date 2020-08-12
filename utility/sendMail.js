// use strict";;
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "rh1409573@gmail.com",
      pass: "@r@o@b@i@n123",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Robin Hood 👻" <phuyalrn2@gmail.com>', // sender address
    to: "phuyalrn2@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<h1>Hello world?</h1>", // html body
  });
}

main().catch(console.error);
