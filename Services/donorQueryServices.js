const DonorQuery = require("../models/donorQuery");

exports.donorQueryTotalHitCountService = async () => {
  console.log("hello from services");
  const getTotalHitCount = await DonorQuery.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$count",
        },
      },
    },
  ]);

  return getTotalHitCount;
};
