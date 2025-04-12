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

userSchema.methods.generateVerificationToken = function () {
    this.verificationToken = crypto.randomBytes(32).toString('hex');
};

userSchema.methods.getDevices = async function () {
    const user = await this.populate('devices');
    return user.devices;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
