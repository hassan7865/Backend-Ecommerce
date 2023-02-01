const Order = require('../models/Order')
const User = require('../models/User')
const { verifyandAuth, verifytokenAdmin ,verify} = require('./VerifyToken')
//CREATED 
const router=require('express').Router()
router.post('/',verify,async(req,res)=>{
    const neworder = new Order(req.body)
    try{
    const createdorder = await neworder.save()
    res.status(200).json(createdorder)
    }catch(err){
        res.status(500).json(err)
    } 
})
//UPDATE
router.put('/:id',verifytokenAdmin,async(req,res)=>{
    try{
    const Updatedorder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        {new:true}
        )
        res.status(200).json(Updatedorder)
    }catch(err){
        res.status(500).json(err)
    }
})
//DELETE
router.delete(':/userId',verifytokenAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete({userId:req.param.userId});
        res.status(200).json("Cart Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
//GET USER
router.get('/:userId',verifyandAuth,async(req,res)=>{
    try{
        const orderfind = await Order.find({userId:req.params.userId})
        res.status(200).json(orderfind)
    }catch(err){
        res.status(500).json(err)
    }
})
//GET ALL USER
router.get('/',verifytokenAdmin,async(req,res)=>{
    try{
        const Allorder = await Order.find();
        res.status(200).json(Allorder)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router