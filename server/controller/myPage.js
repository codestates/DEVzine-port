const { User } = require('../Models/Users');
const { Contribution } = require('../Models/Contributions');
const { Subscriber } = require('../Models/Subscribers');
const bcrypt = require('bcryptjs');

module.exports = {
  getUserInfo: async (req, res) => {
    try {
      
      let userID = req.user._id;
      let user = await User.findOne({
        _id: userID,
      });
      if (!user) {
        return res.status(404).json({
          message: 'Invalid user',
        });
      }

      const {
        user_email,
        user_password,
        user_name,
        user_gender,
        user_age,
        user_position,
        user_language,
        subscribed,
        contribution_id,
      } = user;

      let contributions = await Contribution.find(
        {
          contribution_id: {
            $in: contribution_id,
          },
          status: {
            $nin: [112],
          },
        },
        {
          contribution_id: 1,
          contribution_title: {
            $ifNull: [ '$temp_title', '$contribution_title' ],
          },
          contribution_url: 1,
          status: 1,
          _id: 0,
        },
      );

      return res.status(200).json({
        data: {
          user: {
            user_email,
            user_password,
            user_name,
            user_info: {
              user_gender,
              user_age,
              user_position,
              user_language,
            },
            subscribed,
          },
          contributions,
        },
        message: 'User data successfully found',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  patchUserInfo: async (req, res) => {
    try {
      const { user_email, user_name } = req.body;

      let overlapUser = await User.findOne({
        user_name,
      });

      if (overlapUser && overlapUser.user_email !== user_email) {
        return res.status(409).send({ message: `${user_name} already exists` });
      }

      const { user_gender, user_age, user_position, user_language } =
        req.body.user_info;

      const user_password = await bcrypt.hashSync(req.body.user_password, 10);

      let subscribed;
      if (req.body.subscribed === '구독') {
        subscribed = true;
        await Subscriber.updateOne(
          {
            subscriber_email: user_email,
          },
          {
            subscriber_email: user_email,
          },
          {
            upsert: true,
          },
        );
      } else {
        subscribed = false;
      }

      const update = {
        user_password,
        user_name,
        user_gender,
        user_age,
        user_position,
        user_language,
        subscribed,
      };

      let user = await User.findOneAndUpdate(
        {
          user_email,
        },
        update,
        {
          new: true,
        },
      );

      if (!user) {
        return res.status(404).json({
          message: 'Invalid user',
        });
      }

      return res.status(200).json({
        data: {
          user_name,
        },
        message: 'Patch success',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
