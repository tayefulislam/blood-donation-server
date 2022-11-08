const jwt = require("jsonwebtoken");

exports.genateToken = (userInfo) => {
  const secretToken = process.env.SECRET_TOKEN_KEY;
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, secretToken, {
    expiresIn: 20,
  });

  return token;
};
