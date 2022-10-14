const Donor = require("../models/Donor");

exports.createDonorService = async (newDonor) => {
  console.log(newDonor);
  const result = await Donor.create(newDonor, { runValidators: true });
  console.log(result);
  return result;
};

exports.updateDonorProfileService = async (filter, donor) => {
  const result = await Donor.updateOne(
    filter,
    { $set: donor },
    { upsert: true, runValidators: true }
  );

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
