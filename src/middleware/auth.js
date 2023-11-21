
import jwt from 'jsonwebtoken'
import Account from '../models/account.js'

export const auth=async(req,res,next)=>{
    try{
        //console.log("co vao day");
        const token=req.header('Authorization').replace('Bearer ','')
        //console.log("co vao day");
        const decode=jwt.verify(token,"ewewe23124113")
        console.log("co vao day");
        const user =await Account.findOne({_id: decode._id,'tokens.token': token})
        if(!user)
        {
            return res.status(404).send("User not exits")
        }
        req.token=token
        req.account=user

        next()
    }catch(e){
        res.status(401).send('Error: Please authenticate!')
    }
}


