const Order = require('../models/Order');
const { verifytokenAdmin } = require('./VerifyToken');

const router = require('express').Router()

router.get("/inm",verifytokenAdmin,async(req,res)=>{
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: lastyear } } },
            {
              $project: {
                month: { $month: "$createdAt" },
                sales: "$ammount",
              },
            },
            {
              $group: {
                _id: "$month",
                total: { $sum: "$sales" },
              },
            },
          ]);
          res.status(200).json(income);
        } catch (err) {
          res.status(500).json(err);
        }
})
module.exports = router