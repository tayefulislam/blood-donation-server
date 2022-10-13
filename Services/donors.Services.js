const Donor = require("../models/Donor");

exports.createDonorService = async (newDonor) => {
  const result = await Donor.create(newDonor);
  return result;
};
