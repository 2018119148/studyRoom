<template>
  <div class="floor">
 <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|楼层编辑</b>
    </div>
    <div class="floor_centent">
        <div class="floor_top" >
          <p v-for="item in floor_number" :key="item" @click="switchFloor(item)">{{item+1}}楼</p>
        </div>
        <div :class="'page'+page"  v-show="showIt" id="page">
          <div class="page_centent"><p>大厅</p>
               <p>包厢</p>
        </div>
               
        </div>
       
    </div>
  </div>
</template>

<script>
export default {
  data () {
   return {
     floor_number:[],
     showIt:true,
     page:0
   };
  },
 // 页面创建后数据渲染
  created: function () {
    this.getFloorNumber();
   
  },
  components: {},

  computed: {},


  methods: {
         // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 获取楼层数
    getFloorNumber(){
       this.$axios({
          url: "http://localhost/generalize/showgeneralize",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          var number=res.data[0].floor_number;
          for(var i=0;i<number;i++){
              this.floor_number.push(i);
          }
        });
    },
    // 楼层切换
    switchFloor(e){
         console.log(e);
         this.page=e;
    }
  }
}

</script>
<style scoped>
.goback {
  margin-left: 20px;
  width: 95%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(192, 191, 191);
  color: #1a72b6;
}
.floor_top{
  display: flex;
  margin-left: 20px;
}
.floor_top>p{
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(170, 167, 167);
  text-align: center;
  margin: 5px 5px;
}
#page{
  width: 95%;
  height: 100px;
  margin-left: 20px;
}
.page_centent{
  margin-left: 4px;
  display: flex;
 
}
.page_centent>p{
   width: 50%;
   border: 1px solid rgb(197, 190, 190);
   text-align: center;
   margin: 0px;
}
/* .page0{
  background-color: red;
  width: 95%;
  height: 100px;
  margin-left: 20px;
}
.page1{
  background-color: rgb(21, 36, 247);
  width: 95%;
  height: 100px;
  margin-left: 20px;
} */
</style>