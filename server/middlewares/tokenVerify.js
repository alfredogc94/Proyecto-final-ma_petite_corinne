import jwt from "jsonwebtoken"


export const tokenVerify = (req, res, next) =>{
  const tokenbearer = req.headers.authorization;
  if(!tokenbearer){
    res.status(401).json("no autorizado")
  }else{
    let token = tokenbearer.split(" ")[1];
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err)=>{
      if(err){
        res.status(401).json("no autorizado")
      }else{       
        req.token = token;
        next()
      }
    })
  }
}