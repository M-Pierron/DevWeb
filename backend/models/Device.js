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

DeviceSchema.methods.getAttributesMap = function () {
    // Recuperer les clées de "attributes"
    const attributeKeys = Array.from(this.attributes.keys());

    // Créer un dictionaire, ou les clées sera celle de "attributeKeys"
    const attributesMap = new Map();

    attributeKeys.forEach((key) => {
        const attribute = this.attributes.get(key);
        attributesMap.set(key, attribute.defaultValue === null ? null : attribute.defaultValue);
    });

    return attributesMap;
};

module.exports = mongoose.model('Device', DeviceSchema);