const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/data',function(err){
           if(err){
              console.log(err);
           }else{
               console.log('θΏζ₯ζε');
           }
})
module.exports=mongoose;