const express=require('express');
const router=express.Router();
const User=require('../mongoose/user');
const Order=require('../mongoose/order');
const Seat=require('../mongoose/seat');
const Manage=require('../mongoose/manage');
const Generalize=require('../mongoose/generalize');
// 增加订单信息
router.post('/addorder',(req,res)=>{
        User.findOne({'username':req.body.username},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                const order=new Order({
                    user_id:data._id,
                    seat_id:req.body.seat_id,
                    time_section:req.body.time_section,
                    order_number:req.body.order_number,
                    order_state:'未支付',
                    money:0,
                    roomname:req.body.room,
                    generalizeId:req.body.manageId,
                    address:req.body.address
                })
                order.save();
                res.end();
            }
        })
      
})
// 展示相应的用户订单信息
router.post('/showorder',(req,res)=>{
       User.findOne({'username':req.body.username},(err,data)=>{
           if(err){
               console.log(err);
           }else{
               Order.find({'user_id':data._id},(err,data1)=>{
                   if(err){
                       console.log(err);
                   }else{
                       res.json(data1);
                   }
               })
           }
       })
})
// 展示管理者账号对应的订单信息（完成）
router.get('/showAll',(req,res)=>{
    const skip=6*(req.query.page-1);
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        Generalize.findOne({'gid':data1._id},(err,data2)=>{
            if(data2==null){
                console.log("无自习室");
            }else{
                Order.find({'generalizeId':data2._id},(err,data3)=>{
                    if(data3==null){
                        console.log('没有自习室的信息')
                    }else{
                         res.send(data3)
                    }
                }).limit(6).skip(skip)
            }    
        })
    })
})
// 展示管理者账号对应的订单信息
router.get('/showData',(req,res)=>{
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        Generalize.findOne({'gid':data1._id},(err,data2)=>{
            if(data2==null){
                console.log("无自习室");
            }else{
                console.log(data2._id)
                Order.find({'generalizeId':data2._id},(err,data3)=>{
                    if(data3==null){
                        console.log('没有自习室的信息')
                    }else{
                        console.log(data3)
                         res.send(data3)
                    }
                })
            }    
        })
    })
})
// 删除订单信息
router.post('/delete',(req,res)=>{
    Order.findOneAndDelete({'_id':req.body.id},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json(data)
        }
    })
})
// 更新订单
router.post('/upload',(req,res)=>{
    Order.findOne({'_id':req.body.id},(err,data)=>{
        if(err){
            console.log(err);
        }else{
           
            Seat.findOne({'_id':data.seat_id},(err,data1)=>{
                if(err){
                    console.log(err);
                }else{
                    if(data1.type=="大厅"){
                       Order.findByIdAndUpdate({'_id':req.body.id},{'order_state':'已支付','money':'8'},(err,data2)=>{
                           if(err){
                               console.log(err);
                           }else{
                               res.json(data2)
                           }
                       })
                    }else{
                        Order.findByIdAndUpdate({'_id':req.body.id},{'order_state':'已支付','money':'10'},(err,data3)=>{
                            if(err){
                                console.log(err);
                            }else{
                                res.json(data3)
                            }
                        })
                    }
                }
            })

        }
    })
})
// 检测座位是否被预约
router.post('/check',(req,res)=>{
      Order.find({'seat_id':req.body.id},(err,data)=>{
          if(err){
              console.log(err);
          }else{
              res.json(data);
          }
      })
})
// 订单编号查找
router.get('/select',(req,res)=>{
    console.log(req.query.order_number);
    Order.findOne({'order_number':req.query.order_number},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data)
        }
    })
})

module.exports=router;