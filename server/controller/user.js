const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');
require('dotenv').config();

module.exports = {
  signUp: async (req, res) => {
    const { user_email, user_name, user_info } = req.body;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }
    const tempUser = await VerifiedEmail.findOne({ temp_email: user_email });
    if (!tempUser) {
      return res.status(401).send({ message: 'Email unverified' });
    }

    try {
      const user_password = await bcrypt.hash(req.body.user_password, 10);
      const newUser = new User({
        user_email,
        user_password,
        user_name,
        ...user_info,
      });
      await newUser.save((err) => {
        if (err) {
          return res
            .status(409)
            .send({ message: `${user_email} already exists` });
        }
      });
        VerifiedEmail.deleteOne({ temp_email: user_email }, (err) => {
            if (err) {
            return res.status(404).send({ message: 'Not found' });
            }
        });
      res.status(201).send({ message: 'User created' });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  signOut: async (req, res) => {
    try {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      });
      res.status(200).send({ message: 'Logout success' });
    } catch (err) {
      res.status(404).send({ message: 'Not found' });
    }
  },

  signIn: async (req, res) => {
    jwt.sign(
      { user: req.user },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          // maxAge: 24 * 60 * 60 * 1000, // 있든 말든 상관 없는듯
          // domain: 'devzine-port.com', path: '/' // 이건 넣으면 걍 안됨;;
        });
        res.status(200).send({ data: { user_name: req.user.user_name }, message: 'Login success' });
      }
    );
  },

  deleteUser: async (req, res) => {
    if (!req.user) {
      return res.status(400).send({ message: 'Invalid user' });
    }
    const { _id } = req.user;
    try {
      User.deleteOne({ _id }, (err) => {
        if (err) {
          return res.status(404).send({ message: 'Not found' });
        }
      });
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      });
      res.status(204).send({ message: 'User deleted' });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
