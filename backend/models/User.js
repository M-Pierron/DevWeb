const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true }, // Ajout de userId
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
