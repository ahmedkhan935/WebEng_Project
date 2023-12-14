const adminMiddleware = (req, res, next) => {
    try {
        if (req.role !== 'admin') {
            return res.status(403).json({ errorMessage: "Forbidden: User is not a admin" });  // 403 because user is authenticated but does not have permission
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ errorMessage: "Internal server error" });
    }
}

module.exports = adminMiddleware;