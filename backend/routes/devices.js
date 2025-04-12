const express = require("express");
const DeviceCategory = require("../models/DeviceCategory");
const Device = require("../models/Device");
const UserDevice = require("../models/UserDevice");
const User = require("../models/User");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Route pour avoir tous les appareils
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

  console.log("Appareils:", categoriesWithDevices);
  res.json(categoriesWithDevices);
});

// Route pour filtrer les appareils par catégorie
router.post("/filter", async (req, res) => {
  try {
    // Récuperer l'utilisateur connectée
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // Récuperer les appareils de l'utilisateur
    const devices = await user.getDevices();

    // Les appareils qui ont été selectionnées
    const selectedDevices = req.body.selectedDevices;

    if (selectedDevices.length === 0){
      console.log("Aucun filtrage selectionnée:", devices);
      return res.json(devices);
    }

    // Filtres les appareils de l'utilisateur
    const filteredDevices = devices.filter(device => 
      selectedDevices.includes(device.deviceId)
    );

    console.log("Filtrage des appareils:", filteredDevices);
    res.json(filteredDevices);

} catch (error) {
    console.error("Erreur lors de la récupération des appareils de l'utilisateur:", error);
}
});

// Route pour avoir les appareils de l'utilisateur connecté
router.get("/getConnectedUserDevices", async(req, res) => {
    try {
        // Récuperer l'utilisateur connectée
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // Récuperer les appareils de l'utilisateur
        const devices = await user.getDevices();

        console.log("Appareils de l'utilisateur:", devices);
        res.json(devices);

    } catch (error) {
        console.error("Erreur lors de la récupération des appareils de l'utilisateur:", error);
    }
});

// Route pour l'utilisateur qui va ajouter un nouvelle appareil à travers du formulaire
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

    if (req.body.deviceId.trim() === ""){
      formErrors.deviceId = "Veuillez choisir le type de l'appareil";
    }

    // if (Object.keys(formErrors).length > 0) {
    //   return res.status(400).json({ error: "Erreur de formulaire", formErrors: formErrors });
    // }
    
    const userDevice = await UserDevice.create({
      name: req.body.name,
      description: req.body.description,
      id: uuidv4(),
      mode: req.body.mode,
      battery: req.body.battery,
      wifi: req.body.wifi,
      deviceId: req.body.deviceId
    });

    console.log(userDevice);
    user.devices.push(userDevice._id)
    await user.save();

    res.json(userDevice);

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
