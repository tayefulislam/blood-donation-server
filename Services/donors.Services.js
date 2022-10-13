const Donor = require("../models/Donor");

exports.createDonorService = async (newDonor) => {
  const result = await Donor.create(newDonor);
  return result;
};

exports.updateDonorProfileService = async (filter, donor) => {
  const result = await Donor.updateOne(filter, donor);

  return result;
};
exports.donorInfoService = async (email) => {
  const result = await Donor.findOne({ email: email });

  return result;
};

exports.getAllDonorInfoService = async (email) => {
  const result = await Donor.find().sort({ _id: -1 });

  return result;
};
