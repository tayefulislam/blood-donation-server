const {
  makeBloodRequestsService,
  getBloodRequestsSerive,
  getBloodRequestByIdSerive,
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
    console.log(req.query);

    const { group, district } = req?.query;

    const queries = {};

    if (group) {
      queries.group = group;
    }
    if (district) {
      queries.district = district;
    }

    console.log(queries);

    const result = await getBloodRequestsSerive(queries);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "No Blood Request found",
      error: error.message,
    });
  }
};

exports.getBloodRequestById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await getBloodRequestByIdSerive(id);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "No Match Blood Request found",
      error: error.message,
    });
  }
};
