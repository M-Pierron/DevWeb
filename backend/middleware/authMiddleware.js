// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; // Extrait le token du header

    if (!token) {
        return res.status(401).json({ error: "Token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Décode le token avec la clé secrète
        req.user = decoded; // Assure-toi que `decoded` contient bien l'ID de l'utilisateur
        next(); // Passe à la route suivante
    } catch (error) {
        return res.status(401).json({ error: "Token invalide" });
    }
};

module.exports = authMiddleware;
