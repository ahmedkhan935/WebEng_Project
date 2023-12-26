require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authmiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified.user;
    req.email = verified.email;
    req.role = verified.role;
    next();
  } catch (err) {
    console.log("Authmiddleware error");
    console.error(err);
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

const StudentRoleMiddleware = (req, res, next) => {
  if (req.role === "student") {
    next();
  } else {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
const TeacherRoleMiddleware = (req, res, next) => {
  if (req.role === "teacher") {
    next();
  } else {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = Authmiddleware;
