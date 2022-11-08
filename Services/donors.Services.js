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
  console.log(email);
  const adminInfo = await Donor.findOne({ email: email });
  console.log(adminInfo);

  if (adminInfo.role === "admin") {
    const result = await Donor.find().sort({ _id: -1 });
    return result;
  } else {
    return [];
  }
};

exports.changeRoleService = async (email) => {
  console.log(email);
  const result = await Donor.updateOne(
    { email: email },
    { role: "admin" },
    { runValidators: true }
  );
  return result;
};

exports.createUserService = async (body) => {
  const result = await Donor.create(body);
  return result;
};

exports.loginUserService = async (email) => {
  const user = await Donor.findOne({ email: email });
  return user;
};
