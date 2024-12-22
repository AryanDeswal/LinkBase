// src/config/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, name, phone, verificationCode) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'New User Verification Code',
            text: `New user registration details:
                \nName: ${name}
                \nEmail: ${email},
                \nPhone: ${phone}
                \nVerification Code: ${verificationCode}`
        });
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};


const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const resetLink = `https://www.mga2002.in/resetpassword?token=${resetToken}`;
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email, // Sending directly to user's email
            subject: 'Password Reset Request',
            html: `
                <h2>Password Reset Request</h2>
                <p>You requested a password reset for your account. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this reset, please ignore this email.</p>
                <p>For security reasons, please do not share this link with anyone.</p>
            `
        });
        return true;
    } catch (error) {
        console.error('Password reset email sending error:', error);
        return false;
    }
};


module.exports = { 
    sendVerificationEmail,
    sendPasswordResetEmail 
};
