const express = require('express');
const router = express.Router();
const {
    handleUpload,
    createInteriorData,
    handleMulterError,
    updateInteriorData,
    getAllInteriorData,
    getInteriorDataById,
    deleteInteriorData
} = require('../controllers/InteriorController');

// Route to create new interior data
router.post('/interiors', createInteriorData);

// Route to update existing interior data by ID
router.put('/update/interiors/:id', updateInteriorData);

// Route to delete interior data by ID
router.delete('/interiors/:id', deleteInteriorData);
// Get route for retrieving all interior data
router.get('/', getAllInteriorData); // New route for all data

router.get('/interior/:id', getInteriorDataById);
// Middleware to handle file upload errors
router.use(handleMulterError);

module.exports = router;
