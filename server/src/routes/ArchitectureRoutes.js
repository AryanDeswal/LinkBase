const express = require('express');
const router = express.Router();
const {
    createArchitectureData,
    handleMulterError,
     updateModalData, deleteModalData, 
    getModalDataById, getModalData } = require('../controllers/ArchitectureController');

// Route to create a new entry with image upload
router.post('/upload',createArchitectureData);

// Route to update existing modal data
router.put('/update/:id', updateModalData);

// Route to delete existing modal data
router.delete('/upload/:id', deleteModalData);
// route to delte  get by id 
router.get('/modal/:id', getModalDataById);

// Route to get all modal data or a specific entry by ID
router.get('/data/:id?', getModalData);
router.use(handleMulterError);

module.exports = router;
