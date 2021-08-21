const { Contribution } = require('../../Models/Contributions');

const findContributionsWithStatus = async (statusCode) => {
  let result = await Contribution.aggregate([
    {
      $match: {
        status: statusCode,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user_email',
        foreignField: 'user_email',
        as: 'user_info',
      },
    },
    {
      $project: {
        contribution_id: 1,
        contribution_title: 1,
        contribution_url: 1,
        status: 1,
        user_name: { $arrayElemAt: ['$user_info.user_name', 0] },
        _id: 0,
      },
    },
    {
      $sort: {
        contribution_date: -1,
      },
    },
  ]);

  return result;
};

module.exports = {
  findContributionsWithStatus,
};
