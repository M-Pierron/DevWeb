const express = require("express");
const ObjectModel = require("../models/objectModel");
const DeviceCategory = require("../models/DeviceCategory");
const Device = require("../models/Device");
const UserDevice = require("../models/UserDevice");
const User = require("../models/User");
const Category = require("../models/categoryModel");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/deviceCategories", async(req, res) => {
  const categories = await DeviceCategory.find({});
  
  //
  // On utilise Promise pour attendre que tous appareils lié à la catégorie on été chargées
  const categoriesWithDevices = await Promise.all(
    categories.map(async (category) => {
      const devices = await Device.find({ categoryId: category.id });
      return {
        ...category.toObject(),
        devices
      };
    })
  );

  res.json(categoriesWithDevices);
});

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
    // Les erreurs lié au formulaire
    const formErrors = {}
    // Trouver l'utilisateur qui est connecté dans la BDD
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (req.body.name.trim() === ""){
      formErrors.name = "Veuillez saisir le nom de l'appareil";
    }

    if (req.body.type.trim() === ""){
      formErrors.type = "Veuillez choisir le type de l'appareil";
    }

    // if (Object.keys(formErrors).length > 0) {
    //   return res.status(400).json({ error: "Erreur de formulaire", formErrors: formErrors });
    // }

    console.log(req.body);
    const userDevice = await UserDevice.create({
      name: req.body.name,
      description: req.body.description,
      id: uuidv4(),
      mode: req.body.mode,
      battery: req.body.battery,
      wifi: req.body.wifi,
      type: req.body.type
    });

    user.devices.push(userDevice._id)
    //await user.save();

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
