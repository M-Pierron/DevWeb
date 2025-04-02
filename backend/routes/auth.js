const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Middleware d'authentification
const { v4: uuidv4 } = require("uuid"); // Pour générer un userId unique

const JWT_SECRET = process.env.JWT_SECRET || "groupedevweb";

// Vérification du token
router.post("/verifyToken", (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ valid: false, error: "Token manquant" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        res.status(401).json({ valid: false, error: "Token invalide" });
    }
});

// Inscription utilisateur
router.post("/register", async (req, res) => {
    const { email, password, prenom, nom, level } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà avec le même email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        // Hasher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur avec un userId unique
        const newUser = new User({
            prenom,
            nom,
            email,
            password: hashedPassword,
            level,
            userId: uuidv4(), 
        });

        // Enregistrer l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({ message: "Utilisateur enregistré avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ error: "Erreur serveur lors de l'inscription" });
    }
});

// Connexion utilisateur
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        // Générer le token avec _id et userId
        const token = jwt.sign(
            { email: user.email, _id: user._id, userId: user.userId }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ error: "Erreur serveur lors de la connexion" });
    }
});

// Récupération des informations du profil
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
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
