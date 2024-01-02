const {
  createPublicDonorsServices,
  getAllPublicDonorsServices,
  updateAreaOrLastDonationDateServices,
} = require("../Services/publicDonorsServices");

exports.createPublicDonors = async (req, res, next) => {
  try {
    const newDonor = req.body;

    console.log("Create New ", newDonor);

    const result = await createPublicDonorsServices(newDonor);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

exports.getAllPublicDonors = async (req, res, next) => {
  try {
    let queries = {};
    const { group, district } = req.query;

    if (group) {
      queries.group = group;
    }

    if (district) {
      queries.district = district;
    }

    queries.status = "active";
    queries.gender = "male";

    const results = await getAllPublicDonorsServices(queries);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

// updateAreaOrLastDonationDate

exports.updateAreaOrLastDonationDate = async (req, res, next) => {
  try {
    const donor = req?.body;

    const updateInfo = await updateAreaOrLastDonationDateServices(donor);
    res.status(200).send(updateInfo);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to update District",
      error: error?.message,
    });
  }
};
