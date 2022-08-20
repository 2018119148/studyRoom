
<template>
<div class="main">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <h2>账号密码登录</h2>
   <el-form-item  prop="managename">
    <el-input type="managename" v-model="ruleForm.managename" autocomplete="off" placeholder="请输入账号"></el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
  </el-form-item>
  <div claa="r">
    <input type="checkbox" class="r11"><span>记住密码</span>
     <span class="r12">忘记密码</span>
  </div>
   
  <el-form-item class="btn">
    <el-button class="btn1" type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
  <div @click="register" class="register">快速注册</div>
</el-form>
</div>
</template>

<script>
  export default {
    data() {
      var validateUsername=(rule,value,callback)=>{
          if(value===''){
               callback(new Error('请输入用户名'));
          }else{
              if(/[^\w]/.test(value)){
               callback(new Error('请不要输入特殊字符'));
              }else if(/\w{6,18}/.test(value)){
                    callback();
              }else{
                     callback(new Error('请输入6-18位的字母、数字、下划线'));
              }
          }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // 同时包含数字、字母且不含特殊符号
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
               callback();
          }else{
               callback(new Error('密码需要6-18位同时包含数字、字母'));
          }
          
        }
      };
      return {
        // ruleForm表单
        ruleForm: {
          managename:'',
          password:'',
        },
        rules: {
         managename: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    
    methods: {
    submitForm() {     
         let {managename,password}=this;
         this.$axios({
            url:"http://localhost/manage/login",
              method:"post",
              data:{
                 managename:this.ruleForm.managename,
                 password:this.ruleForm.password,
                 
              },
              headers:{
                 'Content-Type':"application/json"
             }
        }).then((res)=>{
            if(res.data.message==='登录成功'){
              // 登录成功session进行转跳
              this.$store.commit({
                type:'getManageName',//传递到哪个mutation
                managename:res.data.session,//传递的参数
                // userInfo:res.data.userInfo[0]
              })
             
              
               alert('登录成功！');
                sessionStorage.setItem("token", "true");
               //  页面跳转
               this.$router.push('/');
            }else{
                alert('请输入正确的账户和密码！！！')
            }
            
        })

      },
    register(){
      this.$router.push('./register')
    },
   
    }
  }
</script>
<style>
  
.main{
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-color: rgb(99, 190, 243); */
}
el-form-item{
 margin: 0 !important;
 width: 80% !important;
}
.r11{
  border: none !important;
  list-style: none !important;
  width: 15px !important;
  height: 15px !important;
  margin: 0 !important;
}
.demo-ruleForm{
    width: 330px;
    height: 330px;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    background-color: rgba(0,0,0,0.2);
    margin: auto;
    margin-top: 50px;
}

h2{
  text-align: center;
  color: rgba(255,255,255,0.5);
  margin-bottom: 20px;
}
.btn1{
  width: 100% !important;
  text-align: center;
  margin-top: 5px !important;
 
}
.r12{
  float: right;
    color: blue;
}
.register{
  color: blue;
}
</style>