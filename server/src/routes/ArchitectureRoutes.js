const express = require('express');
const router = express.Router();
const { handleUpload, createModalData, updateModalData, deleteModalData, 
    getModalDataById, getModalData } = require('../controllers/ArchitectureController');

// Route to create a new entry with image upload
router.post('/upload', createModalData);

// Route to update existing modal data
router.put('/update/:id', updateModalData);

// Route to delete existing modal data
router.delete('/upload/:id', deleteModalData);
// route to delte  get by id 
router.get('/modal/:id', getModalDataById);

// Route to get all modal data or a specific entry by ID
router.get('/data/:id?', getModalData);

module.exports = router;
