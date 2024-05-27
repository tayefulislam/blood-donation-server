const DonorQuery = require("../models/donorQuery");

exports.donorQueryTotalHitCountService = async () => {
  console.log("hello from services");
  const getTotalHitCount = await DonorQuery.aggregate([
    {
      $group: {
        _id: "totalDonorQueryHit",
        total: {
          $sum: "$count",
        },
      },
    },
  ]);

  return getTotalHitCount;
};
