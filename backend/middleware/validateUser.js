const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) {
        res.status(401).json({ message: "Token not found" });
        return;
    }

    try {
        const decoded = jwt.verify(token, "secret");
        if (decoded) {
            req.user = decoded;
            next();
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = validateUser;
