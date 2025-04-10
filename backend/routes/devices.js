const express = require("express");
const ObjectModel = require("../models/objectModel");
const Device = require("../models/Device");
const User = require("../models/User");
const Category = require("../models/categoryModel");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Route pour filtrer les objets par catégorie
router.get("/filter", async (req, res) => {
  const categoryName = req.query.category;

  // Trouver la catégorie par son nom
  const category = await Category.findOne({ name: categoryName });
  
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // Trouver les objets qui correspondent à cette catégorie
  const objects = await ObjectModel.find({ category_id: category._id });

  res.json(objects);
});

router.post("/newObject", async (req, res) => {
  try {
    const formErrors = {}
    const user = await User.findById(req.user._id).select('-password');
    console.log(user);
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (req.body.name.trim() === ""){
      formErrors.name = "Veuillez saisir le nom de l'appareil";
    }

    if (req.body.type.trim() === ""){
      formErrors.type = "Veuillez choisir le type de l'appareil";
    }

    if (Object.keys(formErrors).length > 0) {
      return res.status(400).json({ error: "Erreur de formulaire", formErrors: formErrors });
    }

    const device = new Device({
      name: req.body.name,
      description: req.body.description,
      id: uuidv4(),
      mode: req.body.mode,
      battery: req.body.battery,
      wifi: req.body.wifi,
      type: req.body.type
    });

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
