const express = require("express");
const App = express();
const dotenv = require("dotenv");
const moongose = require("mongoose")
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const authRoute = require("./routes/auth")
const cartRoute = require("./routes/cart")
const orderRoute = require('./routes/order')
const incomeRoute = require('./routes/income')
const cors = require("cors")
dotenv.config();
moongose.connect(
    process.env.mongo_url
    ).then(()=>console.log("DB ConnectionSuccesfull!")).catch((err)=>
    console.log(err))
App.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"]
}))
App.use(express.json());
App.use("/api/auth",authRoute);
App.use("/api/users",userRoute);    
App.use("/api/carts",cartRoute)
App.use("/api/products",productRoute);
App.use("/api/orders",orderRoute);
App.use("/api/income",incomeRoute)
App.listen(process.env.port_no,()=>{
    console.log("BackEnd Server is running!")
})