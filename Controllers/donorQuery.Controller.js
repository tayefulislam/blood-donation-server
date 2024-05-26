const {
  donorQueryTotalHitCountService,
} = require("../Services/donorQueryServices");

exports.donorQueryTotalHitCountService = async (req, res, next) => {
  const getTotalHitLive = await donorQueryTotalHitCountService();
  console.log(getTotalHitLive);

  try {
    res.status(200).send(getTotalHitLive);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get total hit count.",
      error: error.message,
    });
  }
};
