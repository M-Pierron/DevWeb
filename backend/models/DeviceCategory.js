const mongoose = require("mongoose");

// Schema qui réprésente une catégorie d'appareil
const DeviceCategorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,  
  },
  name : {
    type: String,
    required: false,
  },
  // Le chemin de l'icone de l'appareil
  imagePath: {
    type: String,  
    required: false,
  }
});

module.exports = mongoose.model('DeviceCategory', DeviceCategorySchema);
