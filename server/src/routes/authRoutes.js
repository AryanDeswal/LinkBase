// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, verify, login, getUsers, forgotPassword, resetPassword , deleteUser,forgetEmail} = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../utils/validation');
const { authenticateMiddleware } = require('../middleware/auth');
const {uploadFiles,upload} = require('../controllers/uploadController');
const { uploadArchitecture ,uploads } = require('../controllers/ArchitectureuploadController');


// User signup
router.post('/signup', signupValidation, signup);

// Email verification
router.post('/verify', verify);

// User login
router.post('/login', loginValidation, login);

// Get all users (authenticated)
router.get('/users', getUsers); 
//delete useer
router.delete('/users/:id', deleteUser);

// Request password reset
router.post('/forgot-password', forgotPassword);

router.post("/forgot-email",forgetEmail);

// Reset password
router.post('/reset-password', resetPassword);

router.delete('/users/:id',deleteUser);

router.post('/upload',upload.single("file"),uploadFiles);


router.post('/uploadarchitecture',uploads.single("file"),uploadArchitecture);

module.exports = router;
