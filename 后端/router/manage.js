const express=require('express');
const router=express.Router();
const Manage=require('../mongoose/manage');
const bcrypt=require('bcryptjs');
// 注册
router.post('/register',(req,res)=>{
    let {managename,password}=req.body;
    const manage = new Manage({
     managename,
     password
    })
    manage.save(function(err){
    if(err){
      console.log(err);
    if(err.code===11000){
      res.send("用户名已存在,注册失败")
    }else{
        res.send("注册失败,原因未知")
    }
    }
     else{
      res.send("success");
     }
    })
})
router.post('/register_name',(req,res)=>{
    Manage.find({'managename':req.body.managename},function(err,data){
        if(err){
            console.log(err);
        }else{
            if(data[0]===undefined){
                // 没有查询到对应用户
                res.send("用户名可用");
            }else{
                // 查询到了
                res.send("用户名已被注册")
            }
        }
    })
})
// 登录
router.post('/login',(req,res)=>{
    Manage.find({'managename':req.body.managename},function(err,data){
        if(err){
            console.log(err);
        }else{
            // 查询不到用户
            if(data[0]===undefined){
                res.send('请输入正确的用户名')
            }else{
                // 查询到对应的用户
                // 通过pcrypt比对(req传入的密码，数据库中的密码（哈希值）)
                const flag=bcrypt.compareSync(req.body.password,data[0].password);
            // 查询到了，密码正确
                  if(flag){
                      req.session.managename=req.body.managename;
                    //   res.send('登录成功');
                      Manage.find({'managename':req.session.managename},(err,data)=>{
                        res.send({message:'登录成功',session:req.session.managename});   
                      })
                  }else{
                     // 查询到了但密码错误
                     res.send('密码错误')
                  }       
            }
        }
    })
})



module.exports=router;