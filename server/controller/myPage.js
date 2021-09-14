const { User } = require('../Models/Users');
const { Contribution } = require('../Models/Contributions');
const { Subscriber } = require('../Models/Subscribers');
const { getAllConfirmedContributions, setNewCacheForContributions } = require('./cachefunction/contributionsCache');
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
          _id: 0
        }
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
      
      let user = User.findOne({
        user_email
      });

      if (!user) {
        return res.status(404).json({
          message: 'Invalid user',
        });
      }

      const overlapUser = await User.findOne({
        user_name,
        user_email: {
          $nin: [ user_email ]
        }
      });

      if (overlapUser) {
        return res.status(409).send({ 
          message: `${user_name} already exists` 
        });
      } 

      const { 
        user_gender, 
        user_age, 
        user_position, 
        user_language 
      } = req.body.user_info;

      const user_password = await bcrypt.hashSync(req.body.user_password, 10);
      
      let subscribed;
      if (req.body.subscribed === '구독') {
        subscribed = true;
      } else {
        subscribed = false;
      }
      if (subscribed) {
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
        let temp = await Subscriber.findOneAndRemove({
          subscriber_email: user_email
        })
      };

      const update = {
        user_password,
        user_name,
        user_gender,
        user_age,
        user_position,
        user_language,
        subscribed,
      };
      await User.findOneAndUpdate(
        {
          user_email,
        },
        update
      );
      
      // 유저 아이디가 바뀐 경우, 바뀐 아이디 반영하여 cache update 
      if (user.user_name !== user_name) {
        let dataForCache = await getAllConfirmedContributions();
        await setNewCacheForContributions(dataForCache);
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
