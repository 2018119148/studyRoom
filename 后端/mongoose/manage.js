const mongoose=require("./db")
const ManageSchema=new mongoose.Schema({
    managename:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    }
},{
    versionKey:false
})
const  Manage=mongoose.model("Manage",ManageSchema,'manage');
module.exports=Manage
