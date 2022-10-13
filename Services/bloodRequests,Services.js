const bloodRequests = require("../models/bloodRequests");

exports.makeBloodRequestsService = async (newRequest) => {
  const result = await bloodRequests.create(newRequest);
  return result;
};

exports.getBloodRequestsSerive = async (queries) => {
  console.log(queries);
  const result = await bloodRequests.find(queries).sort({ _id: -1 });
  // console.log(result);
  return result;
};
exports.getBloodRequestByIdSerive = async (id) => {
  const result = await bloodRequests.find({ _id: id });
  console.log(result[0]);
  return result[0];
};
