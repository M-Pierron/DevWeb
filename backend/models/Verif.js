const mongoose = require('mongoose');

const verifSchema = new mongoose.Schema({
    prenom: String,
    nom: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    level: { type: String, default: 'user' },
    age: Number,
    sexe: String,
    dateNaissance: String,
    photo: String,
    pseudonyme: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

const Verif = mongoose.model('Verif', verifSchema);

module.exports = Verif;