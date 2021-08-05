const { Test } = require('../Models/Test')

module.exports = {

	test: async (req, res) => {

		let test = new Test({ 
			name: 'test name', nickname: 'test nickname' 
		});

		test.save((err, testInfo) => {
			if (err) return res.status(500).send(err);
			return res.status(200).send(testInfo);
		});
		
		// TODO: 등록된 회원수와 구독자수를 가져온다. 
		// status 200: 
		// {
		// 	"data": 
		// 		{
		// 			"total_subscribers" : number,
		// 		},
		// 	"message" : "Subscribers successfully found"
		// }
		// status 404:
		// {
		// 	"message": "Not Found"
		// } 
	}
};