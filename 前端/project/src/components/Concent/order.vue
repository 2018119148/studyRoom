<template>
  <div class="order">
       <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|楼层编辑</b>
    </div>
    <div class="selectOrder">
    <el-input v-model="order_number" placeholder="请输入订单号"></el-input>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
    <div class="showOrder">
         <el-table
    ref="filterTable"
    :data="orderData"
    style="width: 100%">
    <el-table-column
      prop="order_number"
      label="订单编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="roomname"
      label="自习室"
      width="100"
      >
    </el-table-column>
      <el-table-column
      prop="address"
      label="预约座位"
      >
    </el-table-column>
     <el-table-column
      prop="time_section"
      label="预约时段"
      >
    </el-table-column>
    <el-table-column
      prop="order_state"
      label="订单状态"
      width="100"
      :filters="[{ text: '未支付', value: '未支付' }, { text: '已支付', value: '已支付' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.order_state === '未支付' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.order_state}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
    </div>
     <div class="pag">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="nowPage"
        :current-page.sync="currentPage2"
      >
      </el-pagination>
     </div>
  </div>
</template>

<script>
export default {
  data () {
   return {
     
        order_number:null,
        
        currentPage2: 1,
        orderData:[]
   };
  },
    // 页面创建后数据渲染
  created: function () {
    this.getOrderData();
  },


  components: {},

  computed: {},


  methods: {
        // 当前页
    nowPage(e) {
      this.currentPage2 = e;
      this.getOrderData();
    },
       // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 筛选支付、未支付订单
      filterTag(value, row) {
        return row.order_state === value;
      },
    // 获取订单信息
    getOrderData(){
       this.$axios({
          url: "http://localhost/order/showAll",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
           params: {
          page: this.currentPage2,
          managename:this.$store.state.managename
        },
        }).then((res) => {
         console.log(res.data);
         this.orderData=res.data
        });
   
    },
    // 按编号查找订单
    onSubmit(){
       
       this.$axios({
          url: "http://localhost/order/select",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
           params: {
         
        order_number:this.order_number
        },
        }).then((res) => {
          let a=[]
            if(res.data==null){
                alert('查询不到该订单')
            }else{
               a.push(res.data)
               this.orderData=a
            }
         console.log(res.data);
       
        });
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
.showOrder{
    width: 90%;
    margin: auto;
}
.selectOrder{
    width: 90%;
    margin: auto;
    padding-top: 10px;
    padding-bottom: 10px;
}
.pag{
  width: 90%;
  margin: auto;
}
.el-input{
  width: 30%;
}
</style>