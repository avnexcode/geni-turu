export const verifyKey = (req, res, next) => {
    const key = req.query.key;
    const apiKey = process.env.API_KEY || 'aldypanteq';

    if (!key) {
        return res.status(401).json({ error: 'Access denied. No key provided.' });
    }

    if (key.trim() !== apiKey) {
        return res.status(400).json({ error: 'Invalid key.' });
    }

    req.user = { key: key };
    next();
};
