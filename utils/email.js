const nodemailer = require("nodemailer");

const sendEmail = async (options,token,emailToBeSend) => {
  const { email } = options;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
 if(emailToBeSend=='emailVerify'){
 
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "hello from shootfolio",
    text: "message from shootfolio",
    html: `Click <a href="http://localhost:4000/api/shootfolio/confirm/${token}">here</a> to verify your email.`

  };
 
  await transporter.sendMail(mailOptions);
}
else {
  
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "hello from shootfolio",
    text: "Please Reset Your Password",
    html: `Click <a href="http://localhost:3000/resetPassword/${token}">here</a> to reset your password.`

  };
 
  await transporter.sendMail(mailOptions);
}
};

module.exports = sendEmail;
