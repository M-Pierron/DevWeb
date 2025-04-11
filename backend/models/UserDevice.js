const mongoose = require('mongoose');

const WIFI_ENUM = [
    'NONE', 
    'WEAK', 
    'MODERATE', 
    'STRONG', 
]

const MODE_ENUM = [
    'AUTOMATIC',
    'MANUAL',
    'SCHEDULE'
]

// Schema qui réprésente une l'appareil d'un utilisateur
const userDeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    description : String,
    id: { type: String, required: true, unique: true },
    mode : { 
        type: String,
        enum: MODE_ENUM,
        default: 'AUTOMATIC'
    },
    battery: Number,
    wifi: { 
        type: String, 
        enum: WIFI_ENUM,
        default: 'NONE'
    },
    device: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Device' 
    }
});

const UserDevice = mongoose.model('UserDevice', userDeviceSchema);

module.exports = UserDevice;