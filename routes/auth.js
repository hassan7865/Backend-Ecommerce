const router = require("express").Router();
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config();
router.post("/register",async(req,res)=>{
    const newUser = new User({
        first:req.body.first,
        last:req.body.last,
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    });
    try{
    const Saveduser = await newUser.save();
    res.status(200).json(Saveduser)
    }catch(err){
        res.status(501).json(err)
    }
})
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if (!user) {
            res.status(401).json("Wrong Credentials")
        }else{
        const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8); 
        if (hashedpassword!=req.body.password){
            res.status(401).json("WRONG CREDENTIALS")
        }else{
            const accesstoken = jwt.sign(
                {
                id:user._id,
                isAdmin:user.isAdmin
            },process.env.SEC_KEY,
            {expiresIn:"3d"}
           )
            const {password,...other} = user._doc
            res.status(200).json({...other,accesstoken})
        }
    }
    }catch(err){
        res.status(501).json(err)
    }
})
module.exports = router;