const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Middleware d'authentification

// Récupérer tous les utilisateurs (si nécessaire)
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération des utilisateurs" });
    }
});

// Récupérer un utilisateur par ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "ID utilisateur invalide" });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération de l'utilisateur" });
    }
});

// Récupérer le profil de l'utilisateur authentifié
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId; // On récupère bien userId du token

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "ID utilisateur invalide" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json(user);
    } catch (err) {
        console.error("Erreur lors de la récupération du profil:", err);
        res.status(500).json({ error: "Erreur serveur lors de la récupération du profil" });
    }
});

module.exports = router;
