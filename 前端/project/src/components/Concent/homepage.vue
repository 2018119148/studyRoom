<template>
  <div>
      <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|订单统计</b>
    </div>
   <div class="homepage_centent">
        <div ref="echarts" class="simpleDemo">
    </div>
    <div ref="pattern" class="simpleDemo">
    </div></div>
    
  </div>
</template>

<script>
import * as echarts from 'echarts';
  export default {
    data() {
      return {
        chart: null,
        month:[2,0,0,0,0,0,0,0,0,0,0,0],
        month_loabby:[2,0,0,0,0,0,0,0,0,0,0,0],
        month_box:[2,0,0,0,0,0,0,0,0,0,0,0],
        money:[2,0,0,0,0,0,0,0,0,0,0,0]
      }
    },
   
    mounted() {
     this.getMonthdata();
   
    },
    methods: {
      getMonthdata(){
         this.$axios({
          url: "http://localhost/order/showData",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
         var t=[];
         var loabby=[];
         var box=[];

        //  筛选出支付订单
         for(var i=0;i<res.data.length;i++){
                if(res.data[i].order_state=='已支付'){
                    t.push(res.data[i])
                }
         }
          console.log(t)
        
        //  分类出大厅、包厢订单
        for(var i=0;i<t.length;i++){
            if(t[i].address.substring(2,4)=="大厅"){
                loabby.push(t[i])
            }else{
                box.push(t[i])
            }
        }
        var month_l=[];
        var month_b=[];
        for(var j=0;j<loabby.length;j++){
          month_l.push(loabby[j].time_section.substring(0,9).split('-')[1]);
        }
         for(var j=0;j<box.length;j++){
          month_b.push(box[j].time_section.substring(0,9).split('-')[1]);
        }
        // 大厅月份
        for(var i=0;i<month_l.length;i++){
            if(month_l[i]=='1'){
                this.month_loabby[0]++
            }else if(month_l[i]=='2'){
                this.month_loabby[1]++
            }else if(month_l[i]=='3'){
                this.month_loabby[2]++
            }else if(month_l[i]=='4'){
                this.month_loabby[3]++
            }else if(month_l[i]=='5'){
                this.month_loabby[4]++
            }else if(month_l[i]=='6'){
                this.month_loabby[5]++
            }else if(month_l[i]=='7'){
                this.month_loabby[6]++
            }else if(month_l[i]=='8'){
                this.month_loabby[7]++
            }else if(month_l[i]=='9'){
                this.month_loabby[8]++
            }else if(month_l[i]=='10'){
                this.month_loabby[9]++
            }else if(month_l[i]=='11'){
                this.month_loabby[10]++
            }else if(month_l[i]=='12'){
                this.month_loabby[11]++
            }
        }
          // 包厢月份
        for(var i=0;i<month_b.length;i++){
            if(month_b[i]=='1'){
                this.month_box[0]++
            }else if(month_b[i]=='2'){
                this.month_box[1]++
            }else if(month_b[i]=='3'){
                this.month_box[2]++
            }else if(month_b[i]=='4'){
                this.month_box[3]++
            }else if(month_b[i]=='5'){
                this.month_box[4]++
            }else if(month_b[i]=='6'){
                this.month_box[5]++
            }else if(month_b[i]=='7'){
                this.month_box[6]++
            }else if(month_b[i]=='8'){
                this.month_box[7]++
            }else if(month_b[i]=='9'){
                this.month_box[8]++
            }else if(month_b[i]=='10'){
                this.month_box[9]++
            }else if(month_b[i]=='11'){
                this.month_box[10]++
            }else if(month_b[i]=='12'){
                this.month_box[11]++
            }
        }
        
        //  月份归类
        console.log(t[0].time_section.substring(0,9).split('-')[1]);//['2002','2','08']
        var monthdata=[];
       
        for(var j=0;j<t.length;j++){
            // 月份存入
          monthdata.push(t[j].time_section.substring(0,9).split('-')[1])
        //   每月金额
          if(t[j].time_section.substring(0,9).split('-')[1]=='1'&&t[j].money!==0){
              this.money[0]=(t[j].money+this.money[0]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='2'&&t[j].money!==0){
                this.money[1]=(t[j].money+this.money[1]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='3'&&t[j].money!==0){
                this.money[2]=(t[j].money+this.money[2]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='4'&&t[j].money!==0){
                this.money[3]=(t[j].money+this.money[3]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='5'&&t[j].money!==0){
                this.money[4]=(t[j].money+this.money[4]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='6'&&t[j].money!==0){
                this.money[5]=(t[j].money+this.money[5]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='7'&&t[j].money!==0){
                this.money[6]=(t[j].money+this.money[6]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='8'&&t[j].money!==0){
                this.money[7]=(t[j].money+this.money[7]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='9'&&t[j].money!==0){
                this.money[8]=(t[j].money+this.money[8]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='10'&&t[j].money!==0){
                this.money[9]=(t[j].money+this.money[9]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='11'&&t[j].money!==0){
                this.money[10]=(t[j].money+this.money[10]);
          }else if(t[j].time_section.substring(0,9).split('-')[1]=='12'&&t[j].money!==0){
                this.money[11]=(t[j].money+this.money[11]);
          }
        }
        console.log(this.money);
       
        for(var i=0;i<monthdata.length;i++){
            if(monthdata[i]=='1'){
                this.month[0]++
                
            }else if(monthdata[i]=='2'){
                this.month[1]++
            }else if(monthdata[i]=='3'){
                this.month[2]++
            }else if(monthdata[i]=='4'){
                this.month[3]++
            }else if(monthdata[i]=='5'){
                this.month[4]++
            }else if(monthdata[i]=='6'){
                this.month[5]++
            }else if(monthdata[i]=='7'){
                this.month[6]++
            }else if(monthdata[i]=='8'){
                this.month[7]++
            }else if(monthdata[i]=='9'){
                this.month[8]++
            }else if(monthdata[i]=='10'){
                this.month[9]++
            }else if(monthdata[i]=='11'){
                this.month[10]++
            }else if(monthdata[i]=='12'){
                this.month[11]++
            }
        }
        
        this.chart = echarts.init(this.$refs.echarts);
        // 使用指定的配置项和数据展示图表
        var option={
            title: {
                text: '每月预约数'
            },
            tooltip: {},
             legend: {
                data:['每月预约数','每月总金额']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: {type: 'value'},
            series: [{
                data: this.month,
                name: '每月预约数',
                type: 'bar',
            }, {
                name: '每月总金额',
                type: 'bar',
                data: this.money,
               
            },],
            color: ['#66FF99','#FFFF00'],
        }
        this.chart1=echarts.init(this.$refs.pattern)
       
            var  option1={
            title: {
                text: '每月包厢、大厅订单量'
            },
            tooltip: {},
            legend: {
                data:['包厢','大厅']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: {},
            series: [{
                name: '包厢',
                type: 'bar',
                data: this.month_box,
        
            },
            {
                name: '大厅',
                type: 'bar',
                data: this.month_loabby,
               
            },
           
            ],
            color: ['#FFFF00','#FF00FF'],
        }
          this.chart1.setOption(option1);          
         this.chart.setOption(option);
      
        });
      },
   
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
.simpleDemo {
  width: 500px;
  height: 400px;
  margin-left: 5%;
 margin-top: 30px;
}

.homepage_centent{
    display: flex;
}
</style>

