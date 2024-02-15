const PublicDonors = require("../models/publicDonors");

exports.createPublicDonorsServices = async (newPublicDonors) => {
  // console.log(newPublicDonors);
  const result = PublicDonors.create(newPublicDonors);
  return result;
};

exports.getAllPublicDonorsServices = async (queries) => {
  const result = await PublicDonors.find(queries);
  return result;
};

// updated public donor Area or Last donation date

exports.updateAreaOrLastDonationDateServices = async (donor) => {
  // Update District
  console.log(donor);
  if (donor.district) {
    const result = await PublicDonors.updateOne(
      { number: donor.number },
      { district: donor.district, area: donor.area }
    );

    return result;
  }
  // update last Donation Date
  else if (donor.lastDonation) {
    const result = await PublicDonors.updateOne(
      { number: donor.number },
      { lastDonation: donor.lastDonation }
    );

    return result;
  }
};
