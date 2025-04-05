const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['actif', 'inactif'],  
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  
    required: true,
  },
  attributes: {
    type: Map,
    of: String,
    required: false,
  },
  lastInteraction: {
    type: Date,
    default: Date.now,  
  },
  batteryStatus: {
    type: Number,  
    required: false,
  },
  connectivities: {
    type: [String],  
    required: false,
  },
});

module.exports = mongoose.model('Object', ObjectSchema);
