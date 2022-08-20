<template>
   <div class="main">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
    <h2>欢迎注册</h2>
   <el-form-item label="用户名" prop="managename">
    <el-input type="managename" v-model="ruleForm.managename" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item class="btn">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
  export default {
    data() {
      var validateUsername=(rule,value,callback)=>{
          if(value===''){
             this.usernameFlag=false;
               callback(new Error('请输入用户名'));
          }else{
              if(/[^\w]/.test(value)){
               callback(new Error('请不要输入特殊字符'));
              }else if(/\w{6,18}/.test(value)){
                // 如果用户已存在
                  this.$axios({
                       url:"http://localhost/manage/register_name",
                       method:"post",
                       data:{managename:this.ruleForm.managename},
                       headers:{
                        'Content-Type':"application/json"
                       }
                     }).then((res)=>{
                     console.log(res);
                     if(res.data === "用户名已被注册"){
                        callback(new Error('用户名已被注册'));
                       
                     }else{
                       this.usernameFlag=true;
                       callback();
                     }
                   })        
              }else{
                    this.usernameFlag=false;
                     callback(new Error('请输入6-18位的字母、数字、下划线'));
              }
          }
        
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          this.passwordFlag=false;
          callback(new Error('请输入密码'));
        } else {
          // 同时包含数字、字母且不含特殊符号
          if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value)) {
              this.passwordFlag=true;
               callback();
          }else{
              this.passwordFlag=false;
               callback(new Error('密码需要6-18位同时包含数字、字母'));
          }
          
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          this.checkFlag=false;
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
           this.checkFlag=false;
          callback(new Error('两次输入密码不一致!'));
        } else {
           this.checkFlag=true;
          callback();
        }
      };
      return {
        // 判断是否正确输入
        usernameFlag:false,
        passwordFlag:false,
        checkFlag:false,
        // ruleForm表单
        ruleForm: {
          managename:'',
          password:'',
          checkPass: '',
        //   age: ''
        },
        rules: {
         managename: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
    submitForm() {
      
      if(this.usernameFlag&&this.passwordFlag&&this.checkFlag){
        let {managename,password}=this
         this.$axios({
            url:"http://localhost/manage/register",
              method:"post",
              data:this.ruleForm,
              headers:{
                 'Content-Type':"application/json"
             }
        }).then((res)=>{
           console.log('kaishi');
             alert('注册成功！');
             this.$router.push('./login');
        })
        
      }else{
        alert("请完善信息注册")
      }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
.main{
  /* background:url("../../assets/bg.jpg"); */
  width: 100%;
  height: 100%;
  position: absolute;
}
.demo-ruleForm{
 
    width: 600px;
    height: 400px ;
    padding: 20px 20px 20px 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    margin: auto;
}
/* .btn{
  
   position: relative;
} */
</style>