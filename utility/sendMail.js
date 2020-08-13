// use strict";;
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (to, subject, body) => {
  console.log(`${to} ${subject}, ${body}`);
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
    to: to, // list of receivers
    subject: subject, // Subject line
    html: body, // html body
  });
};
