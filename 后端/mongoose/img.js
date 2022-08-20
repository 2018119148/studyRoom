const mongoose=require("./db");
const {Schema}=require('mongoose');
const ImgSchema=new mongoose.Schema({
    img:String,
    name:String,
    giid:{
        type:Schema.Types.ObjectId,
        ref:'generalize'},//映射到自习室表id，即一个自习室对应多张图片
},{
    versionKey:false
})
const Img=mongoose.model("Img",ImgSchema,'img');
module.exports=Img