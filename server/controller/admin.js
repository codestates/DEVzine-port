const { findContributionsWithStatus } = require('./adminfunction/adminView');
const { 
    checkCacheForContributions, 
    insertCacheForOneContribution, 
    deleteCacheForOneContribution 
} = require('./cachefunction/contributionsCache')
const { Contribution } = require('../Models/Contributions')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    adminSignin: async (req, res) => {

        jwt.sign(
            { admin_id: req.user.admin_id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    res.status(500).send(err);
                } 
                res.cookie('admin', token, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: true
                });
                return res.send('admin signin');
            }
        );

    },

	getAllUsersContribution: async (req, res) => {

        try {

            const postRequest = await findContributionsWithStatus(100);
            const patchRequest = await findContributionsWithStatus(101);
            const deleteRequest = await findContributionsWithStatus(102);
            
            let { contributionData } = await checkCacheForContributions();
            const accepted = contributionData.map(data => {
                return {
                    contribution_id: data.contribution_id,
                    contribution_title: data.contribution_title,
                    contribution_url: data.contribution_url,
                    status: data.status,
                    user_name: data.user_name
                }
            })
            
            return res.status(200).json(
                {
                    "data": {
                        "requested": {
                            postRequest,
                            patchRequest,
                            deleteRequest
                        },
                        accepted
                    },
                    "message" : "All contribution data success"
                }
            );

        } catch (err) {

            console.log(err);
            return res.status(500).send(err);

        }

	},

    rejectContribRequest: async (req, res) => {
        
        const { contribution_id, status } = req.body;

        try {

            if (![120, 121, 122].includes(status)) {

                return res.status(400).json(
                    {
                        "message": "Invalid status"
                    }
                );

            }

            const rejectedContribution = await Contribution.findOneAndUpdate(
                {
                    contribution_id
                }, {
                    $set: {
                        status
                    }
                }, {
                    new: true
                }
            )

            if (!rejectedContribution) {

                return res.status(404).json(
                    {
                        "message": "Not found"
                    }
                );
            }

            return res.status(200).json(
                {
                    "message": "Reject success"
                }
            );

        } catch (err) {

            console.log(err);
            return res.status(500).send(err);

        }

	},

    acceptContribRequest: async (req, res) => {

        const { contribution_id, status } = req.body;

        try {

            if (![110, 111, 112].includes(status)) {

                return res.status(400).json(
                    {
                        "message": "Invalid status"
                    }
                );

            }

            let acceptedContribution = await Contribution.findOneAndUpdate(
                {
                    contribution_id
                }, {
                    $set: {
                        status
                    }
                }, {
                    new: true,
                    fields: {
                        _id: 0
                    }
                }
            )

            if (!acceptedContribution) {

                return res.status(404).json(
                    {
                        "message": "Not found"
                    }
                );

            }

            if (acceptedContribution.status === 110 || acceptedContribution.status === 111) {

                await insertCacheForOneContribution(contribution_id, acceptedContribution);
        
            }

            if (acceptedContribution.status === 112) {

                await deleteCacheForOneContribution(contribution_id);

            }

            return res.status(200).json(
                {
                    "message": "Update success"
                }
            );

        } catch (err) {

            console.log(err);
            return res.status(500).send(err);

        }

    }   

};