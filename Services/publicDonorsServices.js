const PublicDonors = require("../models/publicDonors");

exports.createPublicDonorsServices = async (newPublicDonors) => {
  console.log(newPublicDonors);
  const result = PublicDonors.create(newPublicDonors);
  return result;
};

exports.getAllPublicDonorsServices = async (queries) => {
  const result = await PublicDonors.find(queries);
  return result;
};
