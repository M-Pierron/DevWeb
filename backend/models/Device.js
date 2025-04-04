const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: String,
    id: { type: String, required: true, unique: true },
    battery: Number,
    wifi: { 
        type: String, 
        enum: ['NONE', 'VERY WEAK', 'WEAK', 'MODERATE', 'STRONG', 'VERY STRONG'],
        default: 'NONE'
    } 
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;