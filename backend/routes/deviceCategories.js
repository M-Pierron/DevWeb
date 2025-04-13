const express = require("express");
const DeviceCategory = require("../models/DeviceCategory");
const Category = require("../models/categoryModel");
const router = express.Router();

// Récuperer tous les catégories d'appareil
router.get("/", async (req, res) => {
  try {
    // Trouver la collection "deviceCategories" dans la base de données
    const deviceCategories = await DeviceCategory.find();
    res.json(deviceCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    await category.remove();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modifier une catégorie d'appareil
router.post("/edit", async (req, res) => {
  try {
    const deviceCategoryId = req.body.id;
    const deviceCategory = await DeviceCategory.findOneAndUpdate({ id: deviceCategoryId }, req.body);
    if (!deviceCategory) {
      
    }
    const updatedCategory = await deviceCategory.save();
    res.json(updatedCategory);

  } catch (error) {
    console.log(error);
  }
});

// Créer une nouvelle catégorie d'appareil
router.post("/create", async (req, res) => {
  const deviceCategory = new DeviceCategory({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  });
  // Make check if ID doesn't exist already
  try {
    const newDeviceCategory = await deviceCategory.save();
    res.status(201).json(newDeviceCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;