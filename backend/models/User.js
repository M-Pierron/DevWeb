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
    points: { type: Number, default: 0 },
    age: Number,
    sexe: String,
    dateNaissance: String,
    photo: String,
    pseudonyme: { type: String, required: true },
    verificationToken: String,
    isVerified: {type: Boolean, default: false},
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserDevice' }]
});

userSchema.pre('save', function(next) {
    if (this.dateNaissance) {
        const birthDate = new Date(this.dateNaissance);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970); 
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

userSchema.methods.removeDevice = async function(_id) {
    const updatedUser = await this.updateOne(
        { $pull: { devices: _id } }
    );
    return updatedUser;
};

userSchema.methods.isAdmin = async function(_id) {
    const admin = await this.findById(_id);
    if (!admin || admin.level !== 'admin') {
        return false;
    }
    return true;
};


const User = mongoose.model('User', userSchema);

module.exports = User;
