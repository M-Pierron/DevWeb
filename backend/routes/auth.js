const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Verif = require("../models/Verif");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const Email = require("../email/email");
const Transporter = require("../email/transporter");

const JWT_SECRET = process.env.JWT_SECRET || "groupedevweb";

// Vérification du token
router.post("/verifyToken", (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ valid: false, error: "Token manquant" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ valid: true, user: decoded });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ valid: false, error: "Token invalide" });
    }
});

// Inscription utilisateur (sauvegarde dans Verif)
router.post("/register", async (req, res) => {
    const errors = {}
    const { email, password, prenom, nom, pseudonyme, confirmPassword } = req.body;
    console.log("Registering user with email:", email);
  
    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            errors.email = "Email déjà utilisé";
        }

        if (password != confirmPassword){
            errors.confirmPassword = "Le mot de passe n'est pas le même";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        try {

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                prenom: prenom,
                nom: nom, 
                pseudonyme: pseudonyme,
                email: email,
                password: hashedPassword,
                level: "user", 
                userId: uuidv4(),
            });
            user.generateVerificationToken();
            await user.save();

            const verificationUrl = `http://localhost:5000/api/auth/verify?token=${user.verificationToken}`;

            // Send email using transporter
            const info = await Transporter.sendMail({
                from: 'CYHouse', // sender address
                to: "dylanmei19@gmail.com",                                         
                subject: "Confirmation inscription",                                     
                text: `Click this link to verify your email: ${verificationUrl}`,                                  
                // html: '<b>Hello world?</b>'
            });
        
            res.status(201).json({ message: "Inscription en attente de vérification" });

        } catch (err) {
            console.error('Error sending email:', err);
        }

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
            // Vérifier si l'utilisateur est en attente de vérification
            const pendingUser = await Verif.findOne({ email });
            if (pendingUser) {
                return res.status(401).json({ error: "Votre compte est en attente de vérification par un administrateur" });
            }
            return res.status(401).json({ error: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id, userId: user.userId, level: user.level },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("Generated token:", token);

        res.json({ 
            message: "Connexion réussie", 
            token,
            user: {
                email: user.email,
                level: user.level,
                userId: user.userId
            }
        });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ error: "Erreur serveur lors de la connexion" });
    }
});

router.get("/verify", async (req, res) => {
    try{
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });
      
        if (!user) {
          return res.status(400).send('Invalid or expired token.');
        }
      
        user.isVerified = true;
        user.verificationToken = undefined; // Remove token after verification
        await user.save();
      
        res.send('Email successfully verified!');
    } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        res.status(500).json({ error: "Erreur serveur" });
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
                photo: user.photo || '',
                level: user.level 
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

// Récupérer les utilisateurs en attente de vérification
router.get("/pending-users", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user || user.level !== 'admin') {
            return res.status(403).json({ error: "Accès non autorisé" });
        }

        const pendingUsers = await Verif.find().select('-password');
        res.json(pendingUsers);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs en attente:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Vérifier un utilisateur
router.post("/verify-user", authMiddleware, async (req, res) => {
    try {
        const { userId, action } = req.body;
        const admin = await User.findById(req.user._id);
        
        if (!admin || admin.level !== 'admin') {
            return res.status(403).json({ error: "Accès non autorisé" });
        }

        const pendingUser = await Verif.findOne({ userId });
        if (!pendingUser) {
            return res.status(404).json({ error: "Utilisateur en attente non trouvé" });
        }

        if (action === 'accept') {
            const newUser = new User({
                ...pendingUser.toObject(),
                _id: undefined
            });
            await newUser.save();
        }

        await Verif.deleteOne({ userId });
        res.json({ message: action === 'accept' ? "Utilisateur accepté" : "Utilisateur refusé" });
    } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        res.status(500).json({ error: "Erreur serveur" });
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
