const { User } = require('../Models/Users');

module.exports = {

  // count all users
	getAllUsers: async (req, res) => {

    User.countDocuments({ subscribed: true }, (err, count) => {
      if (err) {
        res.status(404).send({
          message: "Not Found"
        });
      } else {
        res.status(200).send({
          data: 
          {
              total_subscribers : count,
          },
          message : "Subscribers successfully found"
        });
      }
    });
	}
};