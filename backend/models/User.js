const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    prenom: String,
    nom: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    level: String,
    age: Number,
    sexe: String,
    dateNaissance: String,
    photo: String,
    pseudonyme: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;