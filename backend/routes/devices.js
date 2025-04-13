const express = require("express");
const Object = require("../models/objectModel");
const Category = require("../models/categoryModel");
const DeviceCategory = require("../models/DeviceCategory");
const Device = require("../models/Device");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

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
    const device = await Device.findOneAndUpdate({ id: deviceId }, req.body);
    if (!device) {
      
    }
    const updatedDevice = await device.save();
    res.json(updatedDevice);

  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  const device = new Device({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId
  });
  try {
    const newObject = await device.save();
    res.status(201).json(newObject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const object = await Device.findById(req.params.id);
    if (!object) {
      return res.status(404).json({ message: "Object not found" });
    }
    
    await object.remove();
    res.json({ message: "Object deleted" });
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
