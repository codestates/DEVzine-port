const { Article } = require('../models/Articles');
const { seedArticles } = require('./seed-articles');
const { Contribution } = require('../models/Contributions');
const { seedContributions } = require('./seed-contributions');
const { Subscriber } = require('../models/Subscribers');
const { seedSubscribers } = require('./seed-subscribers');
const { User } = require('../models/Users');
const { seedUsers } = require('./seed-users');

module.exports = {

    insertSeedData :  async (req, res) => {
        try{
            // await Article.create(seedArticles);
            // await Contribution.create(seedContributions);
            // await Subscriber.create(seedSubscribers);
            // await User.create(seedUsers);
            res.json({"message" : "Seed success"});
        } catch(err){
            res.json(err);
        }

    }

}