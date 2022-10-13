const { createDonorService } = require("../Services/donors.Services");

exports.createDonor = async (req, res, next) => {
  try {
    const newDonor = req.body;

    const result = await createDonorService(newDonor);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Create Donor Request Failed",
      error: error.message,
    });
  }
};
