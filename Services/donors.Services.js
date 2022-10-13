const Donor = require("../models/Donor");

exports.createDonorService = async (newDonor) => {
  const result = await Donor.create(newDonor);
  return result;
};

exports.updateDonorProfileService = async (filter, donor) => {
  const result = await Donor.updateOne(filter, donor);

  return result;
};
