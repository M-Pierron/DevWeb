import express from 'express';
import { selectDevice, getSelectedDevice } from '../controllers/deviceController.js';

const router = express.Router();

router.post('/select', selectDevice);  // Select a device
router.get('/selected', getSelectedDevice);  // Get selected device

export default router;