const express=require('express');
const router=express.Router();
const Img=require('../mongoose/img');
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
            let dir='public/image/'+year+month+day;
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

// 图片上传
router.post("/imgload",upload.single('file'),
  function (req, res) {
    const imgUrl="http://localhost/"+req.file.destination+'/'+req.file.filename;
    const img=new Img({
          img:imgUrl,
          name:req.file.originalname,
          giid:req.body.giid
          })
    img.save((err)=>{
          if(err){
              console.log(err);
           }else{
              res.send('环境图片保存成功');
               }
             })
  }    
)
// 环境图片删除
router.post('/imgdelete',(req,res)=>{
        Img.findOneAndDelete({'url':req.body.url},(err,data)=>{
            if(err){
                console.log(err);
            }else{
                const name=req.body.url;
        const name2=name.substr(17);
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
            }

        })
       
})
// 图片显示
router.get('/showImg',(req,res)=>{
     console.log(req.query);
     Img.find({'giid':req.query.giid},(err,data)=>{
        if(err){
            console.log(err);
         }else{
           res.send(data);
         }
     })
})
// 数据接口
router.get('/showit',(req,res)=>{
  Img.find({},(err,data)=>{
    if(err){
      console.log(err);
    }else{
       res.json(data)
    }
  })
})

module.exports=router;