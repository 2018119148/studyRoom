const express=require('express');
const router=express.Router();
const Notice=require('../mongoose/notice');
const Manage=require('../mongoose/manage');
const Generalize=require('../mongoose/generalize');
// 公告发布
router.post('/addnotice',(req,res)=>{
    Manage.find({'managename':req.session.managename},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            const notice=new Notice({
                title:req.body.title,
                content:req.body.content,
                nid:data[0]._id
            })
            notice.save((err)=>{
                if(err){
                    console.log("公告发布失败");
                }else{
                    res.send("公告发布成功");
                }
            })
        }     
    })   
})
// 请求公告信息
router.get('/shownotice',(req,res)=>{
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        Notice.find({'nid':data1._id},(err,data)=>{
                if(err){
                   console.log(err);
                }else{
                    if(data==null){
                        console.log('公告信息为空');
                    }else{
                        res.send(data);
                    }
                  
                }
         })
        })
      
   
})
// 小程序请求
router.post('/showAll',(req,res)=>{
    Generalize.findOne({'_id':req.body.options.id},(err,data1)=>{
            Notice.find({'nid':data1.gid},(err,data)=>{
                console.log(data);
                res.json(data)
            })
        })
  
   
})
// 删除公告
router.post('/deletenotice',(req,res)=>{
    console.log(req.body);
    Notice.findOneAndDelete({'_id':req.body.id},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
})
module.exports=router;