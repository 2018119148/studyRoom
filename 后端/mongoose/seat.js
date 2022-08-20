const mongoose=require("./db");
const {Schema}=require('mongoose');
const SeatSchema=new mongoose.Schema({
    room:String,
    state:String,
   
    type:String,
    level:String,
    box:String,
    seat:String,
    sid:{
        type:Schema.Types.ObjectId,
        ref:'generalize'},//映射到自习室表id，即一个自习室对座位管理
},{
    versionKey:false
})
const Seat=mongoose.model("Seat",SeatSchema,'seat');
module.exports=Seat