const router = require("express").Router();
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")
dotenv.config();
const {verifyandAuth,verify,verifytokenAdmin} = require('./VerifyToken')

//UPDATE USER
router.put("/:id",verifyandAuth,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    }
    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateduser)

    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE USER
router.delete("/:id",verifyandAuth,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
//GET USER
router.get("/find/:id",verifytokenAdmin,async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others}=user._doc
        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err)
    }
})
//GET ALL USER
router.get("/",verifytokenAdmin,async(req,res)=>{
    const query = req.query.new
    try{
        const users = query ? await User.find().sort({_id:-1}).limit(1):await User.find()
        res.status(200).json(users)
    } catch(err){
        res.status(500).json(err)
    }
})
router.get("/stats",verifytokenAdmin,async(req,res)=>{
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastyear}}},
            {
                $project:{
                    month:{$month:"$createdAt"}
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ]);
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;