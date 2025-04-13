const mongoose = require("mongoose");

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
  description : {
    type: String,
    required: false,
  },
  imagePath: {
    type: String,  
    required: false,
  }
});

module.exports = mongoose.model('DeviceCategory', DeviceCategorySchema);
