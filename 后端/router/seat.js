const express=require('express');
const router=express.Router();
const Seat=require('../mongoose/seat');
const Manage=require('../mongoose/manage');
const Generalize=require('../mongoose/generalize');
// 数据提交
router.post('/submit',(req,res)=>{
        console.log(req.body);
        Manage.findOne({'managename':req.session.managename},(err,data1)=>{
            Generalize.findOne({'gid':data1._id},(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data._id);
                    const seat=new Seat({
                       room:data.roomname,
                       state:req.body.formInline.state,
                       type:req.body.formInline.type,
                       level:req.body.formInline.level,
                       box:req.body.formInline.box,
                       seat:req.body.formInline.seat,
                       sid:data._id
                   })
                   seat.save((err)=>{
                      if(err){
                           console.log(err);
                       }else{
                           res.send('座位提交成功');
                     }
                   })
                  }
                
           })
        })
       
      
})
// 数据展示
router.get('/showseat',(req,res)=>{
    const skip=7*(req.query.page-1)
    console.log(req.session)
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        Generalize.findOne({'gid':data1._id},(err,data2)=>{
            if(data2==null){
                console.log("无自习室");
            }else{
                Seat.find({'sid':data2._id},(err,data)=>{
                    if(data==null){
                        console.log('无座位信息');
                    }else{
                      res.send(data);
                    }}).limit(7).skip(skip)
            }
           
        })
    })
})
// 数据删除
router.post('/delete',(req,res)=>{
    console.log(req.body);
    Seat.findOneAndDelete({'_id':req.body.id},(err,data)=>{
          if(err){
              console.log(err);
          }else{
              res.send(data)
          }
    })
})
// 数据修改
router.post('/emitdata',(req,res)=>{
    console.log(req.body);
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        Generalize.findOne({'gid':data1._id},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                Seat.findOneAndUpdate({'_id':req.body.row},{'state':req.body.formInline1.state,'room':data.roomname,
                'type':req.body.formInline1.type,'level':req.body.formInline1.level,'box':req.body.formInline1.box,
               'seat':req.body.formInline1.seat,'sid':data._id},(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                   res.send(data);
                }
            })
              }
            
       })
    })
   
})
// 数据接口
router.get('/showdata',(req,res)=>{
    Seat.find({},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.json(data)
        }
    })
})
module.exports=router;