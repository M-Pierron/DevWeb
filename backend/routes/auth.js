const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET || "groupedevweb";

// Vérification du token
router.post("/verifyToken", (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Verifying token:", token);
    if (!token) return res.status(401).json({ valid: false, error: "Token manquant" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);
        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ valid: false, error: "Token invalide" });
    }
});

// Inscription utilisateur
router.post("/register", async (req, res) => {
    const { email, password, prenom, nom, pseudonyme } = req.body;
    console.log("Registering user with email:", email);
  
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            prenom,
            nom,
            pseudonyme, 
            email,
            password: hashedPassword,
            level: "user", 
            userId: uuidv4(),
        });
  
        await newUser.save();
        console.log("User registered successfully:", newUser);
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
        console.log("Login attempt with email:", email);
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

        const token = jwt.sign(
            { email: user.email, _id: user._id, userId: user.userId },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("Generated token:", token);

        res.json({ message: "Connexion réussie", token });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ error: "Erreur serveur lors de la connexion" });
    }
});

// Récupération du profil
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const profileData = {
            public: {
                pseudonyme: user.pseudonyme,
                age: user.age || '',
                sexe: user.sexe || '',
                dateNaissance: user.dateNaissance || '',
                email: user.email,
                photo: user.photo || ''
            },
            private: {
                nom: user.nom,
                prenom: user.prenom
            }
        };
        console.log("Profile data fetched:", profileData);
        res.json(profileData);
    } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération du profil" });
    }
});

// Mise à jour du profil
router.put("/profile/update", authMiddleware, async (req, res) => {
    try {
        const { public: publicData, private: privateData } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    pseudonyme: publicData.pseudonyme,
                    age: publicData.age,
                    sexe: publicData.sexe,
                    dateNaissance: publicData.dateNaissance,
                    email: publicData.email,
                    photo: publicData.photo,
                    nom: privateData.nom,
                    prenom: privateData.prenom
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json({ success: true, message: "Profil mis à jour avec succès" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour du profil" });
    }
});

module.exports = router;