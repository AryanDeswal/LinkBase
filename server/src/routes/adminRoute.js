const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require("../models/AdminModel");
const jwt = require('jsonwebtoken')


const adminRouter = express.Router();


adminRouter.post("/signupadmin",async(req,res)=>{
    try {
        const {email,password} =  await req.body;
        const hashedPassword =  await bcrypt.hash(password,10);
        const admin = await new Admin({
            email,
            password:hashedPassword
        });
        
        await admin.save();

        res.status(201).json({message:"created"})

    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})



adminRouter.post("/signinadmin",async(req,res)=>{
    try {
        const {email,password} = await req.body;
        console.log(email,password)
        const finduser =  await Admin.findOne({email:email});
        console.log(finduser)
        if(!finduser){
            res.status(404).json({message:"user not founded"})
        }
        const comparePassword =  await bcrypt.compare(password,finduser.password);
        console.log(comparePassword)
        if(!comparePassword){
            res.status(401).json({message:"Incorrect password"})
        }
        const adminToken = await jwt.sign({id:JSON.stringify(finduser._id),role:'admin'},process.env.ADMIN_JWT)
        if(!adminToken){
            res.status(500).json({message:"Not able to create token"})
        } 
        res.status(200).json({message:"login success",token:adminToken,role:finduser.role})
    } catch (error) {
        res.status(500)
    }
})


module.exports = adminRouter