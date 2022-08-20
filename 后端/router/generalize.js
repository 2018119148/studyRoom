const express=require('express');
const router=express.Router();
const Generalize=require('../mongoose/generalize');
const Manage=require('../mongoose/manage');
const multer =require('multer');
const path=require('path');
const fs=require('fs');
let upload=multer({//实例化upload对象
    storage:multer.diskStorage({
        // 设置文件存储位置
        destination:function(req,file,cb){
            let date=new Date();
            let year=date.getFullYear();//获取年份
            //不满两位数，需要在头部补充0，getMonth()得到的是0-11，所以要加1
            let month=(date.getMonth()+1).toString().padStart(2,'0');
            // getDay()表示星期几，getData表示几号
            let day=date.getDate();
            let dir='public/main/'+year+month+day;
            // 如果目录不存在就创建目录
            if(!fs.existsSync(dir)){
                // recursive决定能否创建目录
                  fs.mkdirSync(dir,{recursive:true})
            }
            //回调函数
            cb(null,dir)
        },
        // 设置文件名称
        filename:function(req,file,cb){
            // extname(file.originalname)读取文件后缀名
            let fileName=file.fieldname+'-'+Date.now()+path.extname(file.originalname)
            cb(null,fileName)
        }
    })
})
// 表单提交
router.post('/generalize_commit',upload.single('img'),(req,res)=>{
    const imgUrl="http://localhost/"+req.file.destination+'/'+req.file.filename;
    console.log(req.session);
    Manage.find({'managename':req.session.managename},(err,data)=>{
        if(err){
            console.log(err);
        }else{
          const generalize=new Generalize({
             roomname:req.body.roomname,
             room_pic:imgUrl,//商品图片
             address:req.body.address,
             floor_number:req.body.number,
             gid:data[0]._id
         })
         generalize.save((err)=>{
            if(err){
                 console.log(err);
             }else{
                res.redirect("http://localhost:8080/generalize");
                 res.end();
           }
         })
        }
    })
})
// 请求自习室概论数据
router.get('/showgeneralize',(req,res)=>{
    console.log(req.session.managename);
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        console.log(data1);
        Generalize.findOne({'gid':data1._id},(err,data2)=>{
            if(err){
               console.log(err);
            }else{
                if(data2==null){
                   console.log('无自习室信息')
                }else{
                    console.log('有自习室信息')
                    res.send(data2);
                }
              
            }
     })
    })
    
})
// 小程序端展示所有自习室数据
router.get('/showAll',(req,res)=>{
    Generalize.find({},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('xiaochengxu');
            res.json(data)
        }
    })
})
// 删除数据
router.post('/deletedata',(req,res)=>{
    Generalize.findByIdAndDelete({'_id':req.body.row._id},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log("自习室概论删除成功");
        }
    })
     // 删除图片
     const name1=req.body.row.room_pic;
     console.log(name1);
     const name2=name1.substr(17);
     fs.unlink(name2, (err) => {
         if (err) {
           console.log(err)
           res.send({
             status: 1,
             msg: '删除文件失败'
           })
         } else {
           res.send({
             status: 0
           })
         }
       })
})
// 编辑数据
router.post('/generalize_emit',(req,res)=>{
    console.log(req.body);
    Generalize.findOneAndUpdate({'_id':req.body.id},{'roomname':req.body.form.name,'floor_number':req.body.form.number,'address':req.body.form.address},(err,data)=>{
        if(err){
            console.log(err);
        }else{
           res.send(data);
        }
    })
})
// 自习室楼层查找
router.get('/showfloor',(req,res)=>{
    Manage.findOne({'managename':req.session.managename},(err,data1)=>{
        console.log(data1);
        Generalize.findOne({'gid':data1._id},(err,data2)=>{
           if(data2==null){
               console.log('无自习室信息');
           }else{
            res.send(data2)
          }
        })
    })
})

module.exports=router;