const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // -- Créer l'instance de l'application --


app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, n
}));
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const deviceRoutes = require("./routes/userDevices");
const categoriesRouter = require('./routes/deviceCategories');
const objectsRouter = require('./routes/devices');
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/auth", authRoutes);
app.use("/api/devices", authMiddleware, deviceRoutes); 
app.use(authMiddleware);
app.use("/user", userRoutes);
app.use('/api/categories', categoriesRouter);
app.use('/api/objects', objectsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connexion MongoDB réussie"))
    .catch(err => {
        console.error("❌ Erreur de connexion MongoDB :", err);
        process.exit(1);
    });
