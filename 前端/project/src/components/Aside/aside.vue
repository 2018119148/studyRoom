<template>
  <div class="aside">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#C6E2FF"
      text-color="#000"
      active-text-color="red"
      :default-active="this.$route.path"
      router>
        <el-menu-item index="/homepage">
        <i class="el-icon-monitor"></i>
        <span slot="title">首页</span>
      </el-menu-item>
        <el-menu-item index="/generalize">
        <i class="el-icon-school"></i>
        <span slot="title">自习室管理</span>
      </el-menu-item>
        <el-menu-item index="/seat">
        <i class="el-icon-mouse"></i>
        <span slot="title">座位管理</span>
      </el-menu-item>
      <el-menu-item index="order">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/notice">
        <i class="el-icon-mobile"></i>
        <span slot="title">公告管理</span>
      </el-menu-item>
        <!-- <el-menu-item index="/blacklist">
        <i class="el-icon-mobile"></i>
        <span slot="title">黑名单管理</span>
      </el-menu-item> -->
    </el-menu>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },


  components: {},

  computed: {},

  methods: {
   
  },
};
</script>
<style scoped>
.aside{
    height: 100%;
    width: 100%;
    background-color:#C6E2FF;
}
.el-menu{
    border: none;
}

</style>