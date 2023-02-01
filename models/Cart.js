const moongoose = require("mongoose");
const CartSchema = new moongoose.Schema(
    {
    userId:{type:String,required:true,unique:false},
    products:[
        {
            productId:{type:String}
        },
        {
            quantity:{type:Number,default:1}
        }
    ]
    },
    {timestamps:true}

);
module.exports = moongoose.model("Cart",CartSchema)