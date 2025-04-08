const mongoose = require('mongoose');

const WIFI_ENUM = [
    'NONE', 
    'VERY WEAK', 
    'WEAK', 
    'MODERATE', 
    'STRONG', 
    'VERY STRONG'
]

const DEVICE_TYPE_ENUM = [
    "smart_locks",
    "video_doorbell",
    "security_cameras",
    "motion_sensors",
    "smart_alarms",
  
    "smart_bulbs",
    "smart_switches",
    "smart_plugs",
    "smart_power_strips",
  
    "smart_thermostats",
    "smart_ceiling_fans",
    "smart_air_purifiers",
    "smart_humidifiers",
  
    "smart_tvs",
    "smart_speakers",
    "streaming_devices",
    "smart_projectors",
  
    "smart_fridges",
    "smart_ovens",
    "smart_coffee_machines",
    "smart_dishwashers",
  
    "robot_vacuums",
    "smart_washers",
    "smart_irrigation"
];

const DEVICE_CATEGORY_MAP = {
    smart_locks: "security",
    video_doorbell: "security",
    security_cameras: "security",
    motion_sensors: "security",
    smart_alarms: "security",
  
    smart_bulbs: "energy",
    smart_switches: "energy",
    smart_plugs: "energy",
    smart_power_strips: "energy",
  
    smart_thermostats: "comfort",
    smart_ceiling_fans: "comfort",
    smart_air_purifiers: "comfort",
    smart_humidifiers: "comfort",
  
    smart_tvs: "entertainment",
    smart_speakers: "entertainment",
    streaming_devices: "entertainment",
    smart_projectors: "entertainment",
  
    smart_fridges: "kitchen",
    smart_ovens: "kitchen",
    smart_coffee_machines: "kitchen",
    smart_dishwashers: "kitchen",
  
    robot_vacuums: "cleaning",
    smart_washers: "cleaning",
    smart_irrigation: "cleaning"
};

const deviceSchema = new mongoose.Schema({
    name: String,
    id: { type: String, required: true, unique: true },
    battery: Number,
    wifi: { 
        type: String, 
        enum: WIFI_ENUM,
        default: 'NONE'
    },
    type : {
        type: String,
        enum: DEVICE_TYPE_ENUM,
        required: true
    }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;