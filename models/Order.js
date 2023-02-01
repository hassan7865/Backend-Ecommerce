const moongoose = require("mongoose");
const OrderSchema = new moongoose.Schema(
    {
    userId:{type:String,required:true,unique:false},
    username:{type:String,required:true},
    products:[
        {
            productId:{type:String},
            name:{type:String},
            quantity:{type:Number,default:1}
        },
    ],
    ammount:{type:Number,required:true},
    division:{type:String,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Pending"}
    },
    {timestamps:true}

);
module.exports = moongoose.model("Order",OrderSchema)