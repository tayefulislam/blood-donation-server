const bloodRequests = require("../models/bloodRequests");

exports.makeBloodRequestsService = async (newRequest) => {
  const result = await bloodRequests.create(newRequest);
  return result;
};

exports.getBloodRequestsSerive = async (query) => {
  const result = await bloodRequests.find().sort({ _id: -1 });
  return result;
};
