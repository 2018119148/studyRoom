/*
 * @Author: your name
 * @Date: 2021-12-23 11:04:58
 * @LastEditTime: 2021-12-24 12:19:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \后端\app.js
 */
const express=require("express");
// 导入组件
const app=express();
const port=80
const path=require('path')
const session=require('express-session');
const manage=require('./router/manage');
const user=require('./router/user');
const notice=require('./router/notice');
const generalize=require('./router/generalize');
const img=require('./router/img');
const seat =require('./router/seat');
const order =require('./router/order');


let axios =require('axios');
let config =require('./config');
let utile=require('./utile')
// 手动配置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //表示允许哪个服务器进行访问
    res.header('Access-Control-Allow-Credentials', "true"); //表示允许携带cookie  允许前端携带cookie请求 允许前端接收响应的cookie
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
})
app.use(session({
    secret:"this is session",//生成签名
    resave:false,//强制保存session
    saveUninitialized:true,//强制保存尚未初始化的session
    name:"sessionID",//
    cookie:{
      maxAge:1000*60*60//1小时后过期
    },
}))
app.use("/public",express.static(path.join(__dirname,"public")))
app.use(express.json())
app.get('/',(req,res)=>{
    res.send(req.session)
})
// 4、用户点击退出的额时候，销毁session
// req.session.destroy();
app.use('/manage',manage);
app.use('/user',user);
app.use('/notice',notice);
app.use("/generalize",generalize);
app.use('/img',img);
app.use('/seat',seat);
app.use('/order',order);



// 通过code获取openid
app.get('/wxlogin',async (req,res)=>{
    let {data:{openid}}=await axios.get('https://api.weixin.qq.com/sns/jscode2session',{
         //以下为固定参数,从文档查询
          params:{
              appid:config.APPID,
              secret:config.SECRET,
              js_code:req.query.code,
              grant_type:"anthorization_code"
          }
     })
     res.json({openid})
 })
 function joinMessage(...args){
     return args.join('\n')
     
 }
 function calcSign(msg){
     // 调用rsa方法，加密（没有写rsa）
     return rsa(meg,pem).toString('base64')
     
 }
 app.get('/prepay',async (req,res)=>{
     let {money,openid}=req.query
     try{
         let body={
             //以下为固定参数,从文档查询
            
                  appid:config.APPID,
                //   注册完商户才会有
                // 商务号
                  mchid:config.MCHID,
                  description:'测试一下',
                //   生成唯一标识
                  out_trade_no:utile.getGuid(),
                //   支付后跳转的操作
                  notify_url:'',
                //   支付金额
                amount:{total:money},
            //  支付者
                payer:{openid}
         }
         let message=joinMessage('POST','v3/pay/transactions/jsapi','${utile.getTimeAtamp()}',' ${utile.getGuid()}','${ISON.stringify(body)}')
         // 签名（加密）
         let signature=calcSign(message)
     let {data}=await axios.post('https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi',body,{
          headers:{
              Authorization:message
          }
      })
      res.json(data)
 
  }catch(err){
      console.log(err);
  }
 })

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));