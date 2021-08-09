const { Article } = require('../Models/Articles');
const { seedArticles } = require('./seed-articles');
const { Contribution } = require('../Models/Contributions');
const { seedContributions } = require('./seed-contributions');
const { Subscriber } = require('../Models/Subscribers');
const { seedSubscribers } = require('./seed-subscribers');
const { User } = require('../Models/Users');
const { seedUsers } = require('./seed-users');

module.exports = {
  insertSeedData: async (req, res) => {
    try {
      await Article.create(seedArticles);
      await Contribution.create(seedContributions);
      await Subscriber.create(seedSubscribers);
      await User.create(seedUsers);
      res.json({ message: 'Seed success' });
    } catch (err) {
      res.json(err);
    }
  },
};
