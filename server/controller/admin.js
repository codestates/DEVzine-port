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

    temp: async (req, res) => {
        
        // FE 와 추가 논의 예정

        return res.send('contribution fix');

	},

};