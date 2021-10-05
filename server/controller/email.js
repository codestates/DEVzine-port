const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const CryptoJS = require('crypto-js');
require('dotenv').config();

const CLIENT_ENDPOINT = process.env.DEVZINE_CLIENT_ENDPOINT;
// const cryptoKey = process.env.CRYPTO_KEY;

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PWD,
    },
  }),
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

    let data = {
      email: user_email,
    };
    let encryptEmail = user_email;
    // let encryptEmail = CryptoJS.AES.encrypt(
    //   JSON.stringify(data),
    //   cryptoKey,
    // ).toString();
    // console.log('Encrypt : ', encryptEmail);

    let authMailForm;
    ejs.renderFile(
      __dirname + '/ejsform/authMail.ejs',
      { CLIENT_ENDPOINT, user_email, encryptEmail },
      (err, data) => {
        if (err) console.log(err);
        authMailForm = data;
      },
    );

    transporter.sendMail(
      {
        from: 'DEVzine:port <devzineport@gmail.com>',
        to: user_email,
        subject: 'DEVzine 이메일 확인을 위한 메일입니다.',
        html: authMailForm,
      },
      (err, info) => {
        if (err) {
          return res.status(404).send({ message: 'Not found' });
        } else {
          console.log('Email sent: ' + info.response);
          transporter.close();
        }
      },
    );

    return res.status(200).send({ message: 'Email sent' });
  },

  verifyUserEmail: async (req, res) => {
    const { temp_email } = req.body;

    let decryptEmail = temp_email;
    // let bytes = CryptoJS.AES.decrypt(temp_email, cryptoKey);
    // let decryptEmail = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).email;
    // console.log('Decrypt : ', decryptEmail);

    const user = await VerifiedEmail.findOne({ temp_email: decryptEmail });
    if (user) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    const tempEmail = new VerifiedEmail({
      temp_email: decryptEmail,
    });
    await tempEmail.save(err => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json({ message: 'Verified email created' });
    });

    setTimeout(() => {
      tempEmail.remove();
    }, 30 * 60 * 1000);
  },

  updatePasswordEmail: async (req, res) => {
    const { user_email } = req.body;

    try {
      const user = await User.findOne({ user_email });

      if (!user) {
        return res.status(404).json({
          message: 'Invalid email',
        });
      }
      const authcode = Math.random().toString(36).substring(2, 12);

      let authMailForm;
      ejs.renderFile(
        __dirname + '/ejsform/updatePasswordMail.ejs',
        { user_email, authcode },
        (err, data) => {
          if (err) console.log(err);
          authMailForm = data;
        },
      );

      transporter.sendMail(
        {
          from: 'DEVzine:port <devzineport@gmail.com>',
          to: user_email,
          subject: 'DEVzine 인증 코드',
          html: authMailForm,
        },
        (err, info) => {
          if (err) {
            return res.status(404).send({ message: 'Not found' });
          } else {
            console.log('Email sent: ' + info.response);
            transporter.close();
          }
        },
      );

      await User.updateOne({ user_email }, { authcode });

      return res.status(200).json({
        message: 'Authcode mail success',
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
