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
		// Test.create(
		// 	{ name: 'test name', nickname: 'test nickname' },
		// 	(err, test) => {
		// 		if (err) {
		// 			return res.status(500).send(err)
		// 		} else {
		// 			return res.status(200).send('yes ok!')
		// 		}
		// 	}
		// )


	// 	res.status(200).json({
	// 		message: 'Hell Ogu!'
	// 	});

	}
};