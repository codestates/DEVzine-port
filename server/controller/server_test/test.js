// const { Test } = require('../../models/db_test/Test')
// const { Contribution } = require('../../models/Contributions')
// const { Subscriber } = require('../../models/Subscribers')
// const { User } = require('../../models/Users')
const { Article } = require('../../models/Articles')
const { seedArticles } = require('../../seed/seed-articles')

module.exports = {

	test: async (req, res) => {

		try {

			const randomText = 'Random text ' + Math.random();
			// let newContribution = new Contribution({
			// 	contribution_keyword: 'test',
			// 	contribution_title: randomText,
			// 	contribution_url: randomText,
			// 	contribution_content: 'test'
			// })
			// let newSubscriber = new Subscriber({
			// 	subscriber_email: randomText,
			// })
			// let newUser = new User({
			// 	user_email: randomText,
			// 	user_password: 'password',
			// 	user_name: randomText,
			// 	user_gender: 'Female',
			// 	user_age: 26,
			// 	user_position: 'Backend',
			// 	user_language: ['Nodejs', 'Python']
			// })
			// let newArticle = new Article({
			// 	article_title: randomText,
			// 	article_content: 'test',
			// 	article_date: Date.now(),
			// 	article_keyword: 'coding',
			// 	article_url: randomText
			// });
			// let newTest = new Test();

			// await newContribution.save();
			// await newSubscriber.save();
			// await newUser.save();
			// await newArticle.save();
			// await newTest.save();

			await Article.create(seedArticles)

			return res.status(200).send('please')
			// return res.status(200).json({"message": "db successfully connected!", "data" : {
			// 	newTest, newArticle, newUser, newSubscriber, newContribution
			// }});
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}	
	}
};