module.exports = (...role) => {
  return (req, res, next) => {
    console.log(role);
    const userRole = req.user.role;
    console.log(userRole);

    if (role.includes(userRole)) {
      return res.status(403).json({
        status: "failed",
        error: "You are not authorizied to access",
      });
    }

    next();
  };
};
