// 生成随机数的库
const guid = require("guid")
module.exports={
    getGuid(){
        return guid.create().value.replace(/-/g,'')
    },
    // 时间戳
    getTimeAtamp(){
      return Math.round(+new Date /1000)
    }
}