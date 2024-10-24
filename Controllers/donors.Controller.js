const {
  createDonorService,
  updateDonorProfileService,
  donorInfoService,
  getAllDonorInfoService,
  changeRoleService,
  getBloodDonorByGroupAndAreaService,
} = require("../Services/donors.Services");

exports.createDonor = async (req, res, next) => {
  try {
    const newDonor = req.body;

    console.log("Create New ", newDonor);

    const result = await createDonorService(newDonor);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

exports.updateDonorProfile = async (req, res, next) => {
  try {
    const donor = req.body;

    console.log(donor);
    const filter = { email: donor.email };

    const result = await updateDonorProfileService(filter, donor);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

exports.donorInfo = async (req, res, next) => {
  try {
    const email = req.params.email;

    const result = await donorInfoService(email);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

/// Admin Action

exports.getAllDonorInfo = async (req, res, next) => {
  try {
    const { email, search } = req.query;
    const queries = {};

    if (search) {
      queries.search = search;
    }

    console.log(queries);

    const result = await getAllDonorInfoService(email, queries);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "User Data Not Found",
      error: error.message,
    });
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const email = req.params.email;
    console.log(email);
    const result = await changeRoleService(email);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};

// exports.createUser = async (req, res) => {};

exports.getBloodDonorByGroupAndArea = async (req, res, next) => {
  try {
    let queries = {};
    const { group, district } = req.query;

    if (group) {
      queries.group = group;
    }

    if (district) {
      queries.district = district;
    }

    queries.role = "user";
    queries.status = "active";

    const results = await getBloodDonorByGroupAndAreaService(queries);
    res.status(200).send(results);
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to get data ",
      error: error.message,
    });
  }
};
