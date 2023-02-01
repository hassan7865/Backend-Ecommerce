const {verifyandAuth,verify,verifytokenAdmin} = require('./VerifyToken')
const Product = require('../models/Product');
const User = require('../models/User');
const router = require('express').Router();

//CREATE PRODUCT
router.post("/",verifytokenAdmin,async(req,res)=>{
    const newproduct = new Product(req.body)
    try{
        const savedProduct = await newproduct.save();
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})
//UPDATE PRODUCT
router.put("/:id",verifytokenAdmin,async(req,res)=>{
    try{
        const updatedproduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {new:true}
            )
    res.status(200).json(updatedproduct)
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE PRODUCT
router.delete("/:id",verifytokenAdmin,async(req,res)=>{
    try{
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
//GET PRODUCT
router.get("/find/:id",async(req,res)=>{
    try{
    const productsearch = await Product.findById(req.params.id);
    res.status(200).json(productsearch)
    }catch(err){
        res.status(500).json(err)
    }
})
//GET ALL PRODUCTS
router.get('/',async(req,res)=>{
    const qNew = req.query.new
    const qCategory = req.query.category
    try{
        let product;
        if(qNew){
            product = await Product.find().sort({createdAt:-1}).limit(1)
        }else if(qCategory){
            product = await Product.find({
                category:{
                    $in:[qCategory]
                }
            })
        }else{
            product = await Product.find();
        }
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;