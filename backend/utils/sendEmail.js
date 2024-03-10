const nodemailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",// process.env.EMAIL_SERVICE,
    auth: {
      user: "aristendou612@gmail.com", // process.env.EMAIL_USERNAME,
      pass: "dunb uedt dmfh fdvl",//"ewik krpl lsxj rasq" // process.env.EMAIL_PASSWORD,
    },
  });
  transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

  const mailOptions = {
    from: "aristendou612@gmail.com", // process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;