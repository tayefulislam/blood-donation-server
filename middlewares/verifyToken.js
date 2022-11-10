const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "failed to sign in",
      });

      const decode = await promisify(jwt.verify)();
    }
  } catch (error) {}
};
