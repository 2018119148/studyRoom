<template>
  <div>111</div>
</template>

<script>
export default {
  data () {
   return {
       orderList:[],
       blackList:[]
   };
  },
  created: function () {
     this.getOrderlist();
  },

  components: {},

  computed: {},


  methods: {
      getOrderlist(){
        //   先获取订单信息
         this.$axios({
          url: "http://localhost/order/showAlldata",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
        
        //  当前时间比订单时间大，即已过订单时间
         for(var i=0;i<this.orderList.length;i++){
              var a=res.data[i].time_section.substring(0,9);//截取时间
              a.replace(/-/g,'/')
             var myDate = new Date();
             var b=myDate.toLocaleDateString()
             var date1 = new Date(a);
            var date2 = new Date(b);
             if(this.orderList[i].order_state=='未支付'&&date1<date2==true){
                 this.orderList.push(this.orderList[i]);
             }
         }
         console.log(this.orderList);
       
        });
      },
     
  }
}

</script>
<style>
</style>