const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // Créer l'instance de l'application


app.use(cors({
    origin: "http://localhost:5173", // URL de ton frontend
    credentials: true, // Autoriser les cookies ou les informations d'authentification
}));
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const deviceRoutes = require("./routes/devices"); // Ajout de la route pour les appareils
const authMiddleware = require("./middleware/authMiddleware"); 

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/auth", authRoutes);

app.use("/user", authMiddleware, userRoutes);
app.use("/api/devices", authMiddleware, deviceRoutes); 

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));

// ➤ Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connexion MongoDB réussie"))
    .catch(err => {
        console.error("❌ Erreur de connexion MongoDB :", err);
        process.exit(1);
    });
