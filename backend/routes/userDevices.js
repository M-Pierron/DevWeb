const express = require("express");
const DeviceCategory = require("../models/DeviceCategory");
const Device = require("../models/Device");
const UserDevice = require("../models/UserDevice");
const User = require("../models/User");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

async function incrementUserPoints(user) {
  user.points += 1;
  await user.save();
}

router.get("/deviceCategories", async(req, res) => {
  const categories = await DeviceCategory.find({});
  
  // -- On utilise Promise pour attendre que tous appareils lié à la catégorie on été chargées --
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

router.post("/deleteSelectedDevice", async(req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const result = await UserDevice.deleteOne({ _id: req.body.selectedDevice._id });
    if (result.deletedCount === 0) {
      console.log("[/devices/deleteSelectedDevice] Appareil non trouvé ou déja supprimé");
      
    } else {
      console.log("[/devices/deleteSelectedDevice] Appareil supprimé");

      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      await user.removeDevice(req.body.selectedDevice._id);
      const devices = await user.getDevices();

      console.log("[/devices/deleteSelectedDevice] Appareils de l'utilisateur:", devices);
      res.json(devices);
    }

  } catch (error) {
    console.error("[/devices/deleteSelectedDevice] Erreur:", error);
  }
});

router.post("/filter", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const devices = await user.getDevices();

    const selectedDevices = req.body.selectedDevices;

    if (selectedDevices.length === 0){
      console.log("[/devices/filter] Aucun filtrage selectionnée:", devices);
      return res.json(devices);
    }

    const filteredDevices = devices.filter(device => 
      selectedDevices.includes(device.deviceId)
    );

    console.log("[/devices/filter] Filtrage des appareils:", filteredDevices);
    res.json(filteredDevices);

} catch (error) {
    console.error("[/devices/filter] Erreur lors de la récupération des appareils de l'utilisateur:", error);
}
});


router.get("/getConnectedUserDevices", async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        const devices = await user.getDevices();

        console.log("[/devices/getConnectedUserDevices] Appareils de l'utilisateur:", devices);
        res.json(devices);

    } catch (error) {
        console.error("[/devices/getConnectedUserDevices] Erreur lors de la récupération des appareils de l'utilisateur:", error);
    }
});

router.post("/newObject", async (req, res) => {
  try {
    const formErrors = {}
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

    const device = await Device.findOne({ id: req.body.deviceId });
    const deviceAttributesMap = device.getAttributesMap();

    const userDevice = await UserDevice.create({
      name: req.body.name,
      description: req.body.description,
      id: uuidv4(),
      mode: req.body.mode,
      battery: req.body.battery,
      wifi: req.body.wifi,
      deviceId: req.body.deviceId,
      attributes: deviceAttributesMap
    });

    console.log(userDevice);
    user.devices.push(userDevice._id)
    await user.save();

    const userDevices = await user.getDevices();
    res.json(userDevices);

  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
