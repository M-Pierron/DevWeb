const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    pseudonyme: { type: String, required: true }
});

// Pre-save hook to calculate and set the age before saving
userSchema.pre('save', function(next) {
    if (this.dateNaissance) {
        const birthDate = new Date(this.dateNaissance);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate age
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
