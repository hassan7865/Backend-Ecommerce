const moongoose = require("mongoose");
const UserSchema = new moongoose.Schema(
    {
    first:{type:String,required:true},
    last:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
    },
    {timestamps:true}

);
module.exports = moongoose.model("User",UserSchema)