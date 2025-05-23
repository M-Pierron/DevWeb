const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false,
    },
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
    const attributeKeys = Array.from(this.attributes.keys());
    const attributesMap = new Map();

    attributeKeys.forEach((key) => {
        const attribute = this.attributes.get(key);

        let value;
        if (attribute.type === 'GAUGE' || attribute.type === "SLIDER") {
            value = attribute.min;
        } else {
            value = attribute.defaultValue === null ? null : attribute.defaultValue;
        }

        attributesMap.set(key, {
            ...attribute,
            value,
        });
    });

    return attributesMap;
};

module.exports = mongoose.model('Device', DeviceSchema);
