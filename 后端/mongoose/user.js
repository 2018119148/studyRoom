const mongoose=require("./db")
const UserSchema=new mongoose.Schema({
    username:String,
    openid:String
},{
    versionKey:false
})
const User=mongoose.model("User",UserSchema,'user');
module.exports=User
