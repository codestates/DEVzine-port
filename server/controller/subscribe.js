const { User } = require('../Models/Users');
const { Subscriber } = require('../Models/Subscribers');

module.exports = {
  addSubscriber: async (req, res) => {

    const { user_email: subscriber_email } = req.body;
    const subscriber = await Subscriber.findOne({ subscriber_email });

    if (subscriber) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const newSubscriber = new Subscriber({
      subscriber_email,
    });
    await newSubscriber.save(err => {
      if (err) {
        return res.status(500).send(err);
      }
    });

    await User.findOneAndUpdate(
      {
        user_email: subscriber_email,
      },
      {
        subscribed: true,
      },
      {
        new: true,
      },
    );

    res.status(200).send({ message: 'Subscription success' });
  },
};
