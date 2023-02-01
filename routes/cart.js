const Cart = require('../models/Cart')
const { verifyandAuth, verifytokenAdmin ,verify} = require('./VerifyToken')
//CREATED 
const router=require('express').Router()
router.post("/",verify,async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
    const createdCart = await newCart.save()
    res.status(200).json(createdCart)
    }catch(err){
        res.status(500).json(err)
    } 
})
//UPDATE
router.put('/:id',verifyandAuth,async(req,res)=>{
    try{
    const Updatedcart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        {new:true}
        )
        res.status(200).json(Updatedcart)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete(':/userId',verifyandAuth,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete({userId:req.param.userId});
        res.status(200).json("Cart Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/:userId',verifyandAuth,async(req,res)=>{
    try{
        const cartfind = await Cart.findOne({userId:req.params.userId})
        res.status(200).json(cartfind)
    }catch(err){
        res.status(5000).json(err)
    }
})
router.get('/',verifytokenAdmin,async(req,res)=>{
    try{
        const Allcart = await Cart.find();
        res.status(200).json(Allcart)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router