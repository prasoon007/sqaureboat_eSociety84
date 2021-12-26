const jwt = require('jsonwebtoken');
require('dotenv').config();

const fetchUser = (req, res, next) => {
    try {
        const token = req.header('auth-token'); //recieving header from req.header
        if (!token) return res.status(401).json({ "error1": "Please Enter a valid token" });

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        return res.status(401).json({ "error2": "Please Enter a valid token" });
    }
}

module.exports = fetchUser;