const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/data',function(err){
           if(err){
              console.log(err);
           }else{
               console.log('连接成功');
           }
})
module.exports=mongoose;