const mongoose=require("./db");
const {Schema}=require('mongoose');

const GeneralizeSchema=new mongoose.Schema({
    roomname:String,
    room_pic:String,//自习室图片
    address:String,//自习室地址
    floor_number:Number,
    gid:{
        type:Schema.Types.ObjectId,
        ref:'manage'},//映射到管理员分类表id，即一个管理员账号管理自习室
  
},{
    versionKey:false
})
const  Generalize=mongoose.model("Generalize",GeneralizeSchema,'generalize');
module.exports=Generalize
