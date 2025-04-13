const express = require("express");
const Object = require("../models/objectModel");
const Category = require("../models/categoryModel");
const DeviceCategory = require("../models/DeviceCategory");
const UserDevice = require("../models/UserDevice");
const Device = require("../models/Device");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

async function incrementUserPoints(userInstance) {
  if (!userInstance) {
    console.log("[incrementUserPoints] Aucun utilisateur fourni.");
    return;
  }

  userInstance.points += 1;
  await userInstance.save();
  console.log(`[incrementUserPoints] Points de ${userInstance.pseudonyme} : ${userInstance.points}`);
}

router.get("/", async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const deviceId = req.body.id;

    const device = await Device.findOneAndUpdate({ id: deviceId }, req.body, { new: true });
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    // Récuperer tous les appareil utilisateur de même catégorie
    const userDevices = await UserDevice.find({ deviceId: deviceId });

    // Pour chaque appareil utilisateur
    for (const userDevice of userDevices) {
      // Récuperer les attributs de l'appareil utilisateur
      const updatedAttributes = new Map(userDevice.attributes);

      const deviceAttributes = device.attributes;

      for (const [key, attribute] of deviceAttributes) {
        // Si l'appareil utilisateur a cette clée dans son dictionaire
        // Le mettre à jour
        if (updatedAttributes.has(key)) {
          const userDeviceAttribute = updatedAttributes.get(key);

          // Garder la clée "value"
          const updatedAttribute = {
            ...attribute,
            value: userDeviceAttribute.value !== undefined ? userDeviceAttribute.value : attribute.defaultValue,
          };

          // Mettre a jour les attributs de l'appareil
          updatedAttributes.set(key, updatedAttribute);
        } else {
          // Si l'appareil utilisateur n'a pas l'attribut, ajouter le
          updatedAttributes.set(key, {
            ...attribute,
            value: attribute.defaultValue,
          });
        }
      }

      // Save the updated UserDevice back to the database
      userDevice.attributes = updatedAttributes;
      await userDevice.save();
    }

    // Respond with the updated device and the list of user devices
    res.json({ device, userDevices });

    // Find the user and increment their points
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await incrementUserPoints(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post("/create", async (req, res) => {
  try {
    // Check if a device with the same ID already exists
    const existingDevice = await Device.findOne({ id: req.body.id });
    if (existingDevice) {
      return res.status(409).json({ error: "Un appareil avec cet ID existe déjà." });
    }

    const device = new Device({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId
    });

    const newObject = await device.save();
    res.status(201).json(newObject);

    // Fetch user and increment points
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    await incrementUserPoints(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    // Trouver l'appareil dans la BDD avec son ID et le supprimer
    const object = await Device.findOneAndDelete({ id: req.query.id });
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }
    res.json({ message: "Object deleted" });

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await incrementUserPoints(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const categoryName = req.query.category;
    const category = await Category.findOne({ name: categoryName });
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const objects = await Device.find({ category_id: category._id });
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
