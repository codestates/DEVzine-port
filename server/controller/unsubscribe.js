const { Subscriber } = require('../Models/Subscribers');

module.exports = {
  unsubscribe: async (req, res) => {
    
    try {
      
      const { subscriber_email } = req.body;

      const unsubcriber = await Subscriber.findOneAndDelete({ 
        subscriber_email 
      });

      if (!unsubcriber) {

        return res.status(400).json({ 
          "message": "User does not exist" 
        });

      }

      res.status(200).send({ message: 'unsubscription success' });

    } catch (error) {

      console.log(error)
      return res.status(500).send(error);
    
    }
  },
};
