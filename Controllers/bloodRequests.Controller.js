const {
  makeBloodRequestsService,
  getBloodRequestsSerive,
} = require("../Services/bloodRequests,Services");

exports.makeBloodRequests = async (req, res, next) => {
  try {
    const newRequest = req.body;

    const result = await makeBloodRequestsService(newRequest);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Blood Request Failed",
      error: error.message,
    });
  }
};

exports.getBloodRequests = async (req, res, next) => {
  try {
    const result = await getBloodRequestsSerive();

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "No Blood Request found",
      error: error.message,
    });
  }
};
