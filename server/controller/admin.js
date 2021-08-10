module.exports = {

    adminSignin: async (req, res) => {
        
        return res.send('admin signin');

    },

	getAllUsersContribution: async (req, res) => {
        // TODO: 모든 사용자의 기고글과 상태를 불러온다.
        // status:200
        // {
        //     "data" : [
        //         ...
        //         {
        //             "contribution_id": "number", 
        //             "contribution_title": "string",
        //             "contribution_content": "string",
        //             "contribution_keyword": "string",
        //             "contribution_date" : "date",
        //             "hit": "number",
        //             "user_name" : "string",
        //             "status" : "string"
        //         }
        //     ]
        // ,
        //     "message" : "All contribution data success"
        // }
        // status: 404
        // {
        //     "message": "Not found"
        // } 
        
        return res.send('all contributions');

	},

    rejectContribRequest: async (req, res) => {
        
        
        //TODO: 사용자의 기고글 게시/수정/삭제 요청을 거부한다. 
        // body parameters
        // { 
        //     "contribution_id" : "string",
        //     "status" : "number"
        // }
        // status:200
        // {
        //     "message" : "Update rejected"
        // }
        // status:404
        // {   
        //     "message": "Not found"
        // }  
        return res.send('contribution request rejected');

	},

    acceptContribRequest: async (req, res) => {

        //TODO: 사용자의 기고글 게시/수정/삭제 요청을 수락한다. 
        // body parameters
        // { 
        //     "contribution_id" : "string",
        //     "status" : "number"
        // }
        // status:200
        // {
        //     "message" : "Update success"
        // }
        // status:404
        // {   
        //     "message": "Not found"
        // }  
        return res.send('contribution request accepted');

    }   

};