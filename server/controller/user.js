const bcrypt = require('bcryptjs');
const { User } = require('../Models/Users');
const { VerifiedEmail } = require('../Models/Verifiedemails');

module.exports = {
  signUp: async (req, res) => {
    const { user_email, user_password, user_name, user_info } = req.body;

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
      // need hashing password
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
    // if (!req.user) {
    //   return res.status(401).send({ message: 'Unauthorized user' });
    // }

    try {
      req.logout();
      res.status(200).send({ message: 'Logout success' });
    } catch (err) {
      res.status(404).send({ message: 'Not found' });
    }
  },

  signIn: async (req, res) => {
    const { user_name } = req.body;
    // status:401
    // {
    //     "message": "Invalid password"
    // }
    // status:404
    // {
    //     "message": "Invalid user"
    // }
    // invalid user / passwd 경우 passport.js에서 처리하는데 좀 더 찾아봐야함
    res
      .status(200)
      .send({ data: { user_name }, message: 'Login success' });
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
      req.logout();
      res.status(204).send({ message: 'User deleted' });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
