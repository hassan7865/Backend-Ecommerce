const moongoose = require("mongoose");
const ProductSchema = new moongoose.Schema(
    {
    title:{type:String,required:true,unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    category:{type:Array,required:true},
    color:{type:Array,required:true},
    price:{type:Number,required:true},
    size:{type:Array,required:true},
    inStock:{type:Boolean,default:true}
    
    },
    {timestamps:true}

);
module.exports = moongoose.model("Product",ProductSchema)