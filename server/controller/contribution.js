module.exports = {

	addContribution: async (req, res) => {
        
        // TODO: 사용자가 원하는 글을 매거진에 기고한다.
        // req.body
        // { 
        //     "contribution_title" : "string",
        //     "contribution_url" : "string",
        //     "contribution_content" : "string",
        //     "contibution_keyword" : "string",
        // }
        // status: 200
        // {
        //     "message" : "Contribution success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('contribution');

	}
};