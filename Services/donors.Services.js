const Donor = require("../models/Donor");

exports.createDonorService = async (newDonor) => {
  console.log(newDonor);
  const result = await Donor.create(newDonor);
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

exports.getAllDonorInfoService = async (email, queries) => {
  console.log(email);

  const pipeline = [
    {
      $search: {
        index: "donorInfo",
        text: {
          query: queries.search,
          path: {
            wildcard: "*",
          },
          fuzzy: {},
        },
      },
    },
  ];
  const adminInfo = await Donor.findOne({ email: email });
  console.log(adminInfo);

  if (adminInfo.role === "admin" && queries.search) {
    console.log("hello");
    const result = await Donor.aggregate(pipeline).sort({ _id: -1 });
    return result;
  } else if (adminInfo.role === "admin") {
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

exports.getBloodDonorByGroupAndAreaService = async (queries) => {
  console.log(queries);
  const results = await Donor.find(queries);
  return results;
};
