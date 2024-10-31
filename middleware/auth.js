const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

module.exports = (req, res, next) => {
    
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acceso denegado, no hay token' });

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET); //  "Bearer " Ignore
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token inválido' });
    }
    
};
