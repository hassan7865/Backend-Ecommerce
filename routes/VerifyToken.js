const jwt = require('jsonwebtoken');

const verify = (req,res,next)=>{
    const authHeader = req.headers.token;
    if (authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.SEC_KEY,(err,user)=>{
            if(err){
                return res.status(401).json("Token is not valid")
            }
            req.user=user
            next();
        })
    }else{
        res.status(401).json("You are not Authenticated")
    };
}
const verifyandAuth = (req,res,next)=>{
    verify(req,res,()=>{
        
        if(req.user.id===req.params.id||req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed")
        }
    })
}
const verifytokenAdmin = (req,res,next)=>{
    verify(req,res,()=>{
        
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed")
        }
    })
}
module.exports={verify,verifyandAuth,verifytokenAdmin}