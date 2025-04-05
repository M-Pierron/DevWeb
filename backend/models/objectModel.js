const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true, enum: ['actif', 'inactif'] },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Object', ObjectSchema);
