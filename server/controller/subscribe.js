const { User } = require('../Models/Users');
const { Subscriber } = require('../Models/Subscribers');

module.exports = {
  addSubscriber: async (req, res) => {

    let subscriber_email;

    if (req.body.user_name){
      const user = await User.findOne({ user_name: req.body.user_name });
      subscriber_email = user.user_email;
    } else {
      subscriber_email = req.body.user_email;
    }
    
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
