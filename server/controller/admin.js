module.exports = {

    adminSignin: async (req, res) => {
        
        return res.send('admin signin');

    },

	getAllUsersContribution: async (req, res) => {
        // TODO: 모든 사용자의 기고글과 상태를 불러온다.
        // status:200

        // {
        //     "data" : { 
        //         "requested": {
        //                 "postRequest": 
        //                         [ ...,
        //                             {
        //                                     "contribution_id": "number", 
        //                                     "contribution_title": "string",
        //                                     "contribution_content": "string",
        //                                     "user_name" : "string",
        //                                     "status" : "string"
        //                             }, 
        //                         ...],
        //                 "patchRequest": 
        //                         [ ...,
        //                             {
        //                                     "contribution_id": "number", 
        //                                     "contribution_title": "string",
        //                                     "contribution_content": "string",
        //                                     "user_name" : "string",
        //                                     "status" : "string"
        //                             }, 
        //                         ...],
        //                 "deleteRequest": 
        //                         [ ...,
        //                             {
        //                                     "contribution_id": "number", 
        //                                     "contribution_title": "string",
        //                                     "contribution_content": "string",
        //                                     "user_name" : "string",
        //                                     "status" : "string"
        //                             }, 
        //                         ...],
        //         },
        //         "accepted":  // 삭제 거부는 미포함
        //                         [ ...,
        //                             {
        //                                     "contribution_id": "number", 
        //                                     "contribution_title": "string",
        //                                     "contribution_content": "string",
        //                                     "user_name" : "string",
        //                                     "status" : "string"
        //                             }, 
        //                         ...]
        //         }
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