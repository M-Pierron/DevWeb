const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
	to: { type: String, required: true },
	subject: { type: String, required: true },
	body: { type: String, required: true },
});

module.exports = mongoose.model('Email', emailSchema);