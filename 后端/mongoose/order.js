const mongoose=require("./db");
const {Schema}=require('mongoose');
const OrderSchema=new mongoose.Schema({
    order_number:String,
    order_state:String,
    money:Number,
    roomname:String,
    createOrderTime:{
        type:Date,
       
        default:Date.now()
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    seat_id:{
        type:Schema.Types.ObjectId,
        ref:'seat'},//映射到自习室表id，即一个自习室对座位管理
    time_section:String,
    generalizeId:{
        type:Schema.Types.ObjectId,
        ref:'manage'
    },
    address:String
    
},{
    versionKey:false
})
const Order=mongoose.model("Order",OrderSchema,'order');
module.exports=Order