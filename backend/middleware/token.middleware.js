const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

async function verifyToken(req, res, next) {  
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 Find user by email
        const user = await User.findOne({ _id: decoded._id }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found mid" });
        }

        req.user = decoded._id; // now full user data available
       
        next();

    } catch (error) {
        
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { verifyToken };