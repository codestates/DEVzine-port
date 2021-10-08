const { Subscriber } = require('../Models/Subscribers');
const { User } = require('../Models/Users');
const user = require('./user');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const subscriberCount = await Subscriber.find({}).countDocuments();
      const userCount = await User.find({
        subscribed: false,
      }).countDocuments();
      const totalCount = subscriberCount + userCount;

      return res.status(200).json({
        data: {
          total_subscribers: String(totalCount + 5959000),
        },
        message: 'Subscribers successfully found',
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
