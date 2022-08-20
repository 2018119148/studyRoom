const mongoose=require("./db");
const {Schema}=require('mongoose');
const NoticeSchema=new mongoose.Schema({
    title:String,
    content:String,
    nid:{
        type:Schema.Types.ObjectId,
        ref:'manage'},//映射到管理员分类表id，即一个管理员账号管理公告
    createaaTime:{
        type:Date,
        default:Date.now()
    }
},{
    versionKey:false
})
const  Notice=mongoose.model("Notice",NoticeSchema,'notice');
module.exports=Notice
