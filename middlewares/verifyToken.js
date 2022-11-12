const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    console.log(token);

    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not login",
      });
    }

    const decode = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN_KEY
    );
    // assing decode user in req
    req.user = decode;

    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid Token",
    });
  }
};
