<template>
  <el-container>
  <el-header><Header></Header></el-header>
  <el-container class="content">
    <el-aside width="220px"><Aside></Aside></el-aside>
    <el-main><Main></Main></el-main>
  </el-container>
</el-container>
</template>

<script>
import Header from '../components/Header/header.vue';
import Aside from '../components/Aside/aside.vue';
import Main from '../components/Main/main.vue'
export default {
  data () {
   return {
   };
  },

  components: { Header,Aside,Main},

  computed: {},


  methods: {}
}
</script>
<style scoped>

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  
  .el-aside {
    color: #333;
    text-align: center;
    height: 660px;
    background-color:#545c64;
    
   
  }
  
  .el-main {
    background-color: #E9EEF3;
    /* color: #333; */
    
    /* text-align: center; */
    height: 660px;

  }
  


</style>
