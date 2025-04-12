const express = require("express");
const Object = require("../models/objectModel");
const Category = require("../models/categoryModel");
const router = express.Router();

// Route pour filtrer les objets par catégorie
router.get("/filter", async (req, res) => {
  const categoryName = req.query.category;

  // Trouver la catégorie par son nom
  const category = await Category.findOne({ name: categoryName });
  
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Trouver les objets qui correspondent à cette catégorie
  const objects = await Object.find({ category_id: category._id });

  res.json(objects);
});

module.exports = router;
