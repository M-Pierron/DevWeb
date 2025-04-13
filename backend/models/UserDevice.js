const mongoose = require('mongoose');

const WIFI_ENUM = [
    'NONE', 
    'VERY_WEAK',
    'WEAK', 
    'MODERATE', 
    'STRONG', 
]

const MODE_ENUM = [
    'AUTOMATIC',
    'MANUAL',
    'SCHEDULE'
]

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
    },
    attributes: {
        type: Map,
        of: String,
        required: true,
    }
});

const UserDevice = mongoose.model('UserDevice', userDeviceSchema);

module.exports = UserDevice;
