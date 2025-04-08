let selectedDevice = null; // Store selected device in memory

export const selectDevice = (req, res) => {
  selectedDevice = req.body.deviceName; // Store selected device
  res.json({ success: true, selectedDevice });
};

export const getSelectedDevice = (req, res) => {
  res.json({ selectedDevice }); // Send selected device to frontend
};