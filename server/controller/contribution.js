const { User } = require('../Models/Users');
const { Contribution } = require('../Models/Contributions');
require('dotenv').config();

module.exports = {

	addContribution: async (req, res) => {
                
                try {
                        const { 
                                _id, 
                                user_email 
                        } = req.user;
                        const { 
                                contribution_title, 
                                contribution_content,
                                contribution_keyword
                        } = req.body;

                        let user = await User.findOne(
                                { 
                                        _id
                                }
                        );
                        if (!user) {
                                return res.status(404).json(
                                        {
                                                "message": "Not found"
                                        }
                                );
                        }

                        let contribution_date = new Date(Date.now());
                        contribution_date.setHours(contribution_date.getHours() + 9);

                        let newContribution = await Contribution.create(
                                {
                                        user_email,
                                        contribution_title,
                                        contribution_content,
                                        contribution_keyword,
                                        contribution_date,
                                        contribution_url: `temp${Math.random()}`
                                }
                        );

                        await User.updateOne(
                                {
                                        user_email
                                }, {
                                        $push: {
                                                contribution_id: newContribution.contribution_id
                                        }
                                }
                        );

                        const contribution_url = `${process.env.DEVZINE_CLIENT_ENDPOINT}/article/con-${newContribution.contribution_id}`;
                
                        await Contribution.updateOne(
                                {
                                        contribution_id: newContribution.contribution_id
                                }, {
                                        $set: {
                                                contribution_url
                                        }
                                })
                
                        return res.status(200).json(
                                {
                                        "message": "Contribution request success"
                                }
                        );

                } catch (err) {

                        console.log(err)
                        return res.status(500).send(err);
                
                }

	},

        deleteContribution: async (req, res) => {

                try {


                        const { _id, user_email } = req.user;
                        const contribution_id = Number(req.params.contributionid);

                        let user = await User.findOne(
                                { 
                                        _id
                                }
                        );
                        if (!user) {
                                return res.status(404).json(
                                        {
                                                "message": "User not found"
                                        }
                                );
                        }

                        const contributionForDeletion = await Contribution.findOne(
                                {
                                        contribution_id
                                }
                        )

                        if (!contributionForDeletion) {
                                return res.status(404).json(
                                        {
                                                "message": "Contribution not found"
                                        }
                                );
                        }

                        if (contributionForDeletion.user_email !== user_email) {
                                return res.status(403).json(
                                        {
                                                "message": "Unauthorized user"
                                        }
                                );
                        }

                        await Contribution.updateOne(
                                {
                                        contribution_id
                                }, {
                                        $set: {
                                                status: 102
                                        }
                                }
                        )

                        return res.status(200).json(
                                {
                                        "message": "Delete request success"
                                }
                        );

                } catch (err) {

                        console.log(err)
                        return res.status(500).send(err);
                
                }
        
        },

        updateContribution: async (req, res) => {

                
                try {

                        const { _id, user_email } = req.user;
                        const contribution_id = Number(req.params.contributionid);

                        let user = await User.findOne(
                                { 
                                        _id
                                }
                        );
                        if (!user) {
                                return res.status(404).json(
                                        {
                                                "message": "User not found"
                                        }
                                );
                        }

                        const contributionForDeletion = await Contribution.findOne(
                                {
                                        contribution_id
                                }
                        )

                        if (!contributionForDeletion) {
                                return res.status(404).json(
                                        {
                                                "message": "Contribution not found"
                                        }
                                );
                        }

                        if (contributionForDeletion.user_email !== user_email) {
                                return res.status(403).json(
                                        {
                                                "message": "Unauthorized user"
                                        }
                                );
                        }

                        let contribution_date = new Date(Date.now());
                        contribution_date.setHours(contribution_date.getHours() + 9);

                        await Contribution.updateOne(
                                {
                                        contribution_id
                                }, {
                                        $set: {
                                                status: 101,
                                                contribution_date
                                        }
                                }
                        )

                        return res.status(200).json(
                                {
                                        "message": "Update request success"
                                }
                        );

                } catch (err) {

                        console.log(err)
                        return res.status(500).send(err);
                
                }
        
        }
};