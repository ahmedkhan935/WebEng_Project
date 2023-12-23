const studentMiddleware = (req, res, next) => {
    try {
       // console.log(req.role);
        if (req.role !== 'student') {
            return res.status(403).json({ errorMessage: "Forbidden: User is not a student" });  // 403 because user is authenticated but does not have permission
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}

module.exports = studentMiddleware;