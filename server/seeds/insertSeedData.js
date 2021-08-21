const { Article } = require('../Models/Articles');
const { seedArticles } = require('./seed-articles');
const { Contribution } = require('../Models/Contributions');
const { seedContributions } = require('./seed-contributions');
const { Subscriber } = require('../Models/Subscribers');
const { seedSubscribers } = require('./seed-subscribers');
const { User } = require('../Models/Users');
const { seedUsers } = require('./seed-users');
const { Newsletter } = require('../Models/Newsletters');
const { seedNewsletters } = require('./seed-newsletters.js');
const { VerifiedEmail } = require('../Models/Verifiedemails');
const { seedVerifiedEmails } = require('./seed-verifiedemails');
const { Admin } = require('../Models/Admins');
const { seedAdmins } = require('./seed-admins');

module.exports = {
  insertSeedData: async (req, res) => {
    try {
      await Article.create(seedArticles);
      await Contribution.create(seedContributions);
      await Subscriber.create(seedSubscribers);
      await User.create(seedUsers);
      await Newsletter.create(seedNewsletters);
      await VerifiedEmail.create(seedVerifiedEmails);
      await Admin.create(seedAdmins);
      res.json({ message: 'Seed success' });
    } catch (err) {
      res.json(err);
    }
  },
};
