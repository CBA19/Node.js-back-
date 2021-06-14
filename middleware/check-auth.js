const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //const token = req.headers.authorization.split(" ")[1];
    const token = req.header("token");
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    console.log(decodedToken);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    console.log(req.userData.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
