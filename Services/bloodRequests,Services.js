const bloodRequests = require("../models/bloodRequests");

exports.makeBloodRequestsService = async (newRequest) => {
  const result = await bloodRequests.create(newRequest);
  return result;
};
