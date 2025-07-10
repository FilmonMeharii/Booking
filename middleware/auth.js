const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(403).json({ message: 'Ingen token tillhandahållen' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id; // Save admin ID to request object
        next(); // Call next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Ogiltig token' });
    }
};

module.exports = verifyToken;
