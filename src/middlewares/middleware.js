export const verifyToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    if (token.trim() !== 'aldypanteq') {
        return res.status(400).json({ error: 'Invalid token.' });
    }

    req.user = { token: token };
    next();
};