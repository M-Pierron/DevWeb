const express = require("express");
const Object = require("../models/objectModel");
const Category = require("../models/categoryModel");
const router = express.Router();

// Get all objects
router.get("/", async (req, res) => {
  try {
    const objects = await Object.find().populate('category_id');
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new object
router.post("/", async (req, res) => {
  const object = new Object({
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    category_id: req.body.category_id
  });

  try {
    const newObject = await object.save();
    res.status(201).json(newObject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an object
router.put("/:id", async (req, res) => {
  try {
    const object = await Object.findById(req.params.id);
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }

    object.name = req.body.name;
    object.description = req.body.description;
    object.status = req.body.status;
    object.category_id = req.body.category_id;
    
    const updatedObject = await object.save();
    res.json(updatedObject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an object
router.delete("/:id", async (req, res) => {
  try {
    const object = await Object.findById(req.params.id);
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }
    
    await object.remove();
    res.json({ message: "Object deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter objects by category
router.get("/filter", async (req, res) => {
  try {
    const categoryName = req.query.category;
    const category = await Category.findOne({ name: categoryName });
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const objects = await Object.find({ category_id: category._id });
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;