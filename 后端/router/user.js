const express=require('express');
const router=express.Router();
const User=require('../mongoose/user');
router.post('/adduser',(req,res)=>{
        let {username,openid}=req.body;
        console.log(req.body);
        User.findOne({'username':username},(err,data)=>{
                if(err){
                        console.log(err);
                }else{
                   if(data==null&&data.openid!==openid){
                        const user=new User({username,openid});
                        user.save();
                        console.log("用户存入成功");
                        res.end();
                       }else{
                          console.log('存入失败');
                          res.end();
                       }
                  
                       
                }
        })
      
      
})
router.post('/select',(req,res)=>{
        User.findOne({'username':req.body.username},(err,data)=>{
                if(err){
                        console.log(err);
                }else{
                        console.log(data);
                        res.json(data);
                }
        })
})
module.exports=router;