const { Subscriber } = require('../Models/Subscribers');

module.exports = {

	getAllUsers: async (req, res) => {

    Subscriber.countDocuments({  }, (err, count) => {
      if (err) {
        res.status(404).send({
          message: "Not Found"
        });
      } else {
        res.status(200).send({
          data: 
          {
              total_subscribers : (count + 5959000 - 4).toString(),
          },
          message : "Subscribers successfully found"
        });
      }
    });
	}
};