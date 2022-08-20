<template>
  <div class="header">
    <div class="title">自习室后台管理系统</div>
    <div class="Info">
       <div class="name">{{$store.state.managename}}</div>
       <div @click="logout">退出</div>
    </div>
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
    logout(){
       this.$store.commit({
          type:'logout',
        })
          sessionStorage.setItem("token", 'false');
          this.$router.push('/login');
    }
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}
.title{
    font-size: 20px;
}
.Info{
    display: flex;
    margin-right:20px ;
}
.name{
  color:blue;
  padding:0px 10px;
}

</style>