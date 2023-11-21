import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
const accountSchema= new mongoose.Schema({
    hoten:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    makh:{
        type: String,
        default: "KH0"
    },
    gioitinh:{
        type: String,
    },
    ngaysinh:{
        type: String,
    },
    sdt:{
        type: String,
    },
    diachi:{
        type: String,
    },
    cccd:{
        type: String,
    },
    password: {
        type: String,
        //required: true,
        select: false,
        trim: true,
        minLength: 8,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('Password can not contain "password"')
            }
        }

    },
    verifyToken:{
        type: String,
        trim: true
    }
    ,
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }],
},{
    timestamps: true
})

accountSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['tokens']
        delete ret['password']
        delete ret['verifyToken']
        return ret
    }
})


accountSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    //this.makh=newKH;
    next();
  });

  accountSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  accountSchema.methods.generateAuToken= async function(){
    const user = this
    const token=jwt.sign({_id: user._id.toString(),makh:user.makh.toString()}, "ewewe23124113",{expiresIn: '30d'})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
const Account=mongoose.model('account',accountSchema)
export default Account 
