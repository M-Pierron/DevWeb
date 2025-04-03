const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: String,
    id: { type: String, required: true, unique: true },
    battery: Number,
    wifi: Number,
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;