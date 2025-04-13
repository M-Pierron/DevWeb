const express = require("express");
const DeviceCategory = require("../models/DeviceCategory");
const router = express.Router();
const User = require("../models/User");

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
    const deviceCategories = await DeviceCategory.find();
    res.json(deviceCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const deviceCategory = await DeviceCategory.findOneAndDelete({ id: req.query.id });
    if (!deviceCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const deviceCategoryId = req.body.id;
    
    const deviceCategory = await DeviceCategory.findOneAndUpdate({ id: deviceCategoryId }, req.body);
    if (!deviceCategory) {
      
    }
    res.json(deviceCategory);

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await incrementUserPoints(user);
    
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {

  try {
    // Check if a device with the same ID already exists
    const existingDeviceCategory = await DeviceCategory.findOne({ id: req.body.id });
    if (existingDeviceCategory) {
      return res.status(409).json({ error: "Un catégorie avec cet ID existe déjà." });
    }

    const deviceCategory = new DeviceCategory({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    });

    const newDeviceCategory = await deviceCategory.save();
    res.status(201).json(newDeviceCategory);
    
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    await incrementUserPoints(user);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
