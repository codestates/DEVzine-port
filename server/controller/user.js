const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');
const { Subscriber } = require('../Models/Subscribers');
const { Contribution } = require('../Models/Contributions');
const {
  setNewCacheForContributions,
  getAllConfirmedContributions,
} = require('./cachefunction/contributionsCache');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  signUp: async (req, res) => {
    const { user_email, user_name, user_info } = req.body;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }
    const email = await User.findOne({ user_email });
    if (email) {
      return res.status(409).send({ message: `${user_email} already exists` });
    }
    const name = await User.findOne({ user_name });
    if (name) {
      return res.status(409).send({ message: `${user_name} already exists` });
    }
    const tempUser = await VerifiedEmail.findOne({ temp_email: user_email });
    if (!tempUser) {
      return res.status(401).send({ message: 'Email unverified' });
    }

    await Subscriber.findOne({ subscriber_email: user_email }).then(data => {
      if (data) {
        user_info.subscribed = true;
      }
    });

    try {
      const user_password = await bcrypt.hash(req.body.user_password, 10);
      const newUser = new User({
        user_email,
        user_password,
        user_name,
        ...user_info,
      });
      await newUser.save();
      VerifiedEmail.deleteOne({ temp_email: user_email }, err => {
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
      if (res.cookie.jwt) {
        res.clearCookie('jwt', {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        });
        return res.status(200).send({ message: 'Logout success' });
      }
      res.clearCookie('admin', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      return res.status(200).send({ message: 'Logout success' });
    } catch (err) {
      res.status(404).send({ message: 'Not found' });
    }
  },

  signIn: async (req, res) => {
    jwt.sign(
      { user: req.user },
      process.env.JWT_SECRET,
      { expiresIn: '30m' },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        });
        res.status(200).send({
          data: {
            user_name: req.user.user_name,
            user_email: req.user.user_email,
            subscribed: req.user.subscribed,
          },
          message: 'Login success',
        });
      },
    );
  },

  deleteUser: async (req, res, next) => {
    if (!req.user) {
      return res.status(400).send({ message: 'Invalid user' });
    }
    const { _id, user_email } = req.user;
    res.cookie('jwt', '', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    try {
      await Contribution.updateMany(
        {
          user_email,
        },
        {
          user_email: 'anonymous',
        },
      );

      User.deleteOne({ _id }, err => {
        if (err) {
          return res.status(404).send({ message: 'Not found' });
        }
      });

      const cacheToUpdate = getAllConfirmedContributions();
      await setNewCacheForContributions(cacheToUpdate);

      res.status(200).send({ message: 'User deleted' });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  updatePassword: async (req, res) => {
    
    let { user_email, user_password, authcode } = req.body;

    try {
      const user = await User.findOne({ user_email });

      if (!user.authcode) {
        return res.status(404).json({ 
          message: 'Email unverified' 
        });
      }

      if (user.authcode !== authcode) {
        return res.status(401).json({
          message: 'Invalid authcode'
        });
      }

      user_password = await bcrypt.hash(req.body.user_password, 10);
      await User.updateOne({ user_email }, { user_password });
      
      return res.status(200).json({
        message: 'Password changed'
      })
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
