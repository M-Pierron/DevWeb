const mongoose = require('mongoose');
const crypto = require('crypto');

const UserDevice = require('./UserDevice');

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
    pseudonyme: { type: String, required: true },
    
    verificationToken: String,
    isVerified: {type: Boolean, default: false},

    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDevice' }]
});

userSchema.methods.generateVerificationToken = function () {
    this.verificationToken = crypto.randomBytes(32).toString('hex');
};

const User = mongoose.model('User', userSchema);

module.exports = User;