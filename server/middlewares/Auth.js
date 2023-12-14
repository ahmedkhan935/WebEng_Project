require('dotenv').config();
const jwt = require('jsonwebtoken');

const Authmiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        // const token = req.headers.authorization;
        // console.log(token);
        if (!token) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        req.email = verified.email;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = Authmiddleware;