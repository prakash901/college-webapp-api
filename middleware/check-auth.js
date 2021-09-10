const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;
    // console.log("userData is", decodedToken);
    next();
  } catch (error) {
    //401 -> unauthorized
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error,
    });
  }
}

module.exports = {
  checkAuth: checkAuth,
};
