const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Ingen token tillhandahållen' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token saknas' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token (admin info)
        next();
    } catch (error) {
        res.status(401).json({ message: 'Ogiltig token' });
    }
};

module.exports = verifyToken;
