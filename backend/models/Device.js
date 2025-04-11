const mongoose = require("mongoose");

// Schema qui réprésente un appareil
const DeviceSchema = new mongoose.Schema({
    // Nom de l'appareil
    id: {
        type: String,
        required: true,
        unique: true
    },
    // Description de l'appareil, dire ce que l'appareil fait
    name: {
        type: String,
        required: false,
    },
    // La catégorie qui est lié à cette appareil
    categoryId: {
        type: String,
        ref: 'DeviceCategory',  
        required: true,
    },
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: false,
    },
});

module.exports = mongoose.model('Device', DeviceSchema);