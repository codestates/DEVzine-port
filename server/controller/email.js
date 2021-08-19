const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const ejs = require('ejs');
const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');
const crypto = require('crypto');
require('dotenv').config();

const CLIENT_ENDPOINT=process.env.DEVZINE_CLIENT_ENDPOINT;

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PWD,
    },
  })
);

module.exports = {
  reqUserEmail: async (req, res) => {
    const { user_email } = req.body;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    const user = await User.findOne({ user_email });
    if (user) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    let authMailForm;
    const cipher = crypto.createCipher('aes-256-cbc', '1111');
    let encryptEmail = cipher.update(user_email, 'utf8', 'base64');
    encryptEmail += cipher.final('base64');
    console.log('Encrypt : ', encryptEmail);

    ejs.renderFile(
      __dirname + '/ejsform/authMail.ejs',
      { CLIENT_ENDPOINT, user_email, encryptEmail },
      (err, data) => {
        if (err) console.log(err);
        authMailForm = data;
      }
    );

    transporter.sendMail(
      {
        from: 'DEVzine:port <devzineport@gmail.com>',
        to: user_email,
        subject: '회원가입 수락하삼[nodemailer]',
        html: authMailForm,
      },
      (err, info) => {
        if (err) {
          return res.status(404).send({ message: 'Not found' });
        } else {
          console.log('Email sent: ' + info.response);
          transporter.close();
        }
      }
    );

    return res.status(200).send({ message: 'Email sent' });
  },

  verifyUserEmail: async (req, res) => {
    const { temp_email } = req.body;
    const decipher = crypto.createDecipher('aes-256-cbc', '1111');
    let decryptEmail = decipher.update(temp_email, 'base64', 'utf8');
    decryptEmail += decipher.final('utf8');
    console.log('Decrypt : ', decryptEmail);

    const tempEmail = new VerifiedEmail({
      temp_email: decryptEmail,
    });
    await tempEmail.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send({ message: 'Verified email created' });
    });

    setTimeout(() => {
      tempEmail.remove();
    }, 30 * 60 * 1000);
  },
};
