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
        //     "message" : "Contribution request success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('contribution');

	},

        deleteContribution: async (req, res) => {
        
        // TODO: 사용자가 원하는 글을 매거진에서 삭제 요청한다. 
        // req.body
        // { 
        //         "contribution_id": number
        // }
        // status: 200
        // {
        //     "message" : "Delete request success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('delete contribution');
        
        },

        updateContribution: async (req, res) => {
        
        // TODO: 사용자가 원하는 글에 대해 수정 요청한다.
        // req.body
        // { 
	// 	"contribution_title" : "string",
	// 	"contribution_content" : "string",
	// 	"contibution_keyword" : "string",
        // }       
        // status: 200
        // {
        //     "message" : "Update request success"
        // }
        // status:404
        // {
        //     "message": "Not found"
        // }

        return res.send('patch contribution');
        
        }
};