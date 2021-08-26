const { Subscriber } = require('../Models/Subscribers');
const { User } = require('../Models/Users');

module.exports = {
  unsubscribe: async (req, res) => {
    try {
      const { subscriber_email } = req.body;

      const unsubscriber = await Subscriber.findOneAndDelete({
        subscriber_email,
      });

      if (!unsubscriber) {
        return res.status(400).json({
          message: 'User does not exist',
        });
      }

      const user = await User.findOneAndUpdate(
        {
          user_email: subscriber_email,
        },
        {
          $set: {
            subscribed: false,
          },
        },
      );

      if (!user) {
        return res.status(400).json({
          message: 'User does not exist',
        });
      }

      res.status(200).send({ message: 'unsubscription success' });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
