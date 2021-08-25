const { Contribution } = require('../Models/Contributions');
const { User } = require('../Models/Users');
const { findContributionsWithStatus, findContributionsForUpdate } = require('./adminfunction/adminView');
const {
  checkCacheForContributions,
  insertCacheForOneContribution,
  deleteCacheForOneContribution,
} = require('./cachefunction/contributionsCache');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  adminSignIn: async (req, res) => {

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
          secure: true,
        });
        return res.status(200).json({
          message: 'Login success',
        });
      },
    );
  },

  adminSignOut: async (req, res) => {
    try {
      res.clearCookie('admin', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.status(200).send({ message: 'Logout success' });
    } catch (err) {
      res.status(404).send({ message: 'Not found' });
    }
  },

  getAllUsersContribution: async (req, res) => {

    try {
      const postRequest = await findContributionsWithStatus(100);
      const patchRequest = await findContributionsForUpdate();
      const deleteRequest = await findContributionsWithStatus(102);

      let { contributionData } = await checkCacheForContributions();
      const accepted = contributionData.map(data => {
        return {
          contribution_id: data.contribution_id,
          contribution_title: data.contribution_title,
          contribution_url: data.contribution_url,
          status: data.status,
          user_name: data.user_name,
        };
      });

      return res.status(200).json({
        data: {
          requested: {
            postRequest,
            patchRequest,
            deleteRequest,
          },
          accepted,
        },
        message: 'All contribution data success',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  rejectContribRequest: async (req, res) => {
    const { contribution_id, status } = req.body;

    try {
      if (![120, 121, 122].includes(status)) {
        return res.status(400).json({
          message: 'Invalid status',
        });
      }

      const rejectedContribution = await Contribution.findOneAndUpdate(
        {
          contribution_id,
        },
        {
          $set: {
            status,
          },
        },
        {
          new: true,
        },
      );

      if (!rejectedContribution) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      if (
        rejectedContribution.status === 121 ||
        rejectedContribution.status === 122
      ) {
        await insertCacheForOneContribution(contribution_id, data);
      }

      return res.status(200).json({
        message: 'Reject success',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  acceptContribRequest: async (req, res) => {
    const { contribution_id, status } = req.body;

    try {
      if (![110, 111, 112].includes(status)) {
        return res.status(400).json({
          message: 'Invalid status',
        });
      }

      let acceptedContribution = await Contribution.findOneAndUpdate(
        {
          contribution_id,
        }, {
          $set: {
            status,
          },
        }, {
          new: true,
        },
      );

      if (!acceptedContribution) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      if (status === 111) {
        const updatedContribution = await Contribution.findOneAndUpdate(
          {
            contribution_id,
          }, {
            $set: {
              contribution_content: acceptedContribution.temp_content,
              contribution_title: acceptedContribution.temp_title,
              contribution_keyword: acceptedContribution.temp_keyword,
              temp_title: null,
              temp_content: null,
              temp_keyword: null
            }
          }
        );
      }
      
      if (status === 112) {
        const deletedContribution = await Contribution.findOneAndUpdate(
          {
            contribution_id,
          },
          {
            $set: {
              deletedAt: new Date(),
            },
          },
        )
      }

      const user = await User.findOne(
        {
          user_email: acceptedContribution.user_email,
        },
        {
          user_name: 1,
        },
      );

      acceptedContribution = await Contribution.findOne(
        {
          contribution_id,
        },{
          _id: 0,
        },
      );

      const { user_email, ...temp } = acceptedContribution._doc;
      let user_name = 'anonymous';
      if (user) {
        user_name = user.user_name;
      }
      
      const data = { user_name, ...temp };

      if (
        acceptedContribution.status === 110 ||
        acceptedContribution.status === 111
      ) {
        await insertCacheForOneContribution(contribution_id, data);
      }

      if (acceptedContribution.status === 112) {
        await deleteCacheForOneContribution(contribution_id);
      }

      return res.status(200).json({
        message: 'Update success',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  viewRequestedArticle: async (req, res) => {

    const contributionid = Number(req.params.contributionid);

    try {

      const contribData = await Contribution.findOne(
        {
          contribution_id: contributionid,
        },
        {
          _id: 0,
          contribution_date: 1,
          hit: 1,
          status: 1,
          user_email: 1,
          contribution_content: {
            $cond: { 
              if: {
                '$eq': [ '$status', 101 ] 
              }, then: {
                $ifNull: [ '$temp_content', '$contribution_content' ]
              }, else: '$contribution_content' 
            }
          },
          contribution_title: {
            $cond: { 
              if: {
                '$eq': [ '$status', 101] 
              }, then: {
                $ifNull: [ '$temp_title', '$contribution_title' ]
              }, else: '$contribution_title' 
            }
          },
          contribution_keyword: {
            $cond: { 
              if: {
                '$eq': [ '$status', 101 ] 
              }, then: {
                $ifNull: [ '$temp_keyword', '$contribution_keyword' ]
              }, else: '$contribution_keyword' 
            }
          },
        },
      );

      if (!contribData) {
        return res.status(404).json({
          message: 'Not found',
        });
      }

      const user = await User.findOne(
        {
          user_email: contribData.user_email,
        },
        {
          _id: 0,
          user_name: 1,
        },
      );
      
      let user_name;
      if (user) {
        user_name = user.user_name;
      } else {
        user_name = 'anonymous';
      }

      const { user_email, ...data } = contribData._doc;
      
      return res.status(200).json({
        data: { user_name, ...data },
        message: 'Contribution successfully found',
      });

    } catch (err) {

      console.log(err)
      return res.status(500).send(err)

    }

  }

};
