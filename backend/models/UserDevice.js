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
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mode : { 
        type: String,
        enum: MODE_ENUM,
        default: 'AUTOMATIC'
    },
    battery: {
        type: Number,
        min: 0,
        max: 100
    },
    // Le status wifi de l'appareil
    wifi: { 
        type: String, 
        enum: WIFI_ENUM,
        default: 'NONE'
    },
    lastInteraction: {
        type: Date,
        default: Date.now,  
    },
    deviceId: {
        type: String,
        required: true 
    }
});

const UserDevice = mongoose.model('UserDevice', userDeviceSchema);

module.exports = UserDevice;