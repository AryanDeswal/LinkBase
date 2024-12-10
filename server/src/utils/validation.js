// src/utils/validation.js
const { body } = require('express-validator');

const signupValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('dob').isISO8601().withMessage('Invalid date format'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
    body('address').trim().notEmpty().withMessage('Address is required')
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
    signupValidation,
    loginValidation
};