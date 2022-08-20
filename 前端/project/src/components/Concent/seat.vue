<template>
  <div class="slot">
    <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|自习室编辑</b>
    </div>
    <div class="slotEmit">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
           <!-- <el-form-item label="自习室">
          <el-select v-model="formInline.room" placeholder="请选择自习室" @change="searchSelect">
            <el-option v-for="(item,index) in formInline.room" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择状态">
          
            <el-option label="空闲中" value="空闲中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.type" placeholder="请选择类型">
            <el-option label="大厅" value="大厅"></el-option>
            <el-option label="包厢" value="包厢"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层">
           <el-select v-model="formInline.level" placeholder="请选择楼层数">
            <el-option v-for="(item,index) in formInline.level" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房号">
          <el-input v-model="formInline.box" placeholder="房号"></el-input>
        </el-form-item>
        <el-form-item label="座位号">
          <el-input v-model="formInline.seat" placeholder="座位号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="seatShow">
      <el-table
        ref="singleTable"
        :data="tableList"
        highlight-current-row
        style="width: 100%"
      >
        <!-- <el-table-column type="index" width="50"> </el-table-column>
         <el-table-column property="room" label="自习室" width="120">
        </el-table-column> -->
        <el-table-column property="level" label="楼层" width="120">
        </el-table-column>
        <el-table-column property="type" label="类型"> </el-table-column>
        <el-table-column property="box" label="房号" width="120">
        </el-table-column>
      
        <el-table-column property="seat" label="座位号"> </el-table-column>
        <el-table-column property="state" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
         <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="nowPage"
        :current-page.sync="currentPage2"
      >
      </el-pagination>
    </div>
    <!-- 弹窗 -->
    <div class="box">
    <el-dialog title="座位修改" :visible.sync="dialogVisible" width="30%">
        <el-form :inline="true" :model="formInline1" class="demo-form-inline">
           <!-- <el-form-item label="自习室">
          <el-select v-model="formInline1.room" placeholder="请选择自习室" @change="searchSelect">
            <el-option v-for="(item,index) in roomList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-select v-model="formInline1.state" placeholder="请选择状态">
            <el-option label="空闲中" value="空闲中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline1.type" placeholder="请选择类型">
            <el-option label="大厅" value="大厅"></el-option>
            <el-option label="包厢" value="包厢"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层">
           <el-select v-model="formInline1.level" placeholder="请选择楼层数">
            <el-option v-for="(item,index) in formInline.level" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房号">
          <el-input v-model="formInline1.box" placeholder="房号"></el-input>
        </el-form-item>
        <el-form-item label="座位号">
          <el-input v-model="formInline1.seat" placeholder="座位号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="emitSeat">确 定</el-button>
      </span>
    </el-dialog>
    </div>



  </div>
</template>

<script>
export default {
  data() {
    return {
       currentPage2: 1,
     dialogVisible:false,
     row:'',
      formInline: {
        state: "",
        room:'',
        type: "",
        level: "",
        box: "",
        seat: "",
      },
      formInline1: {
        state: "",
        room:'',
        type: "",
        level: "",
        box: "",
        seat: "",
      },
      roomList:[],//对应的自习室
      floorList:[],//楼层数
      roomNumber:[],
      tableList: [
        {
          state: "",
          type: "",
          room:'',
          level: "",
          box: "",
          seat: "",
        },
      ],
    };
  },

  components: {},

  computed: {},
  created: function () {
      // this.getRoom();
      this.getSeat();
      this.getFloor();
  },
  methods: {
    // 当前页
    nowPage(e) {
      this.currentPage2 = e;
      this.getSeat();
    },
    // 获取自习室楼层
   getFloor(){
        
        this.$axios({
        url: "http://localhost/generalize/showfloor",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.data);
        for(var i=1;i<=res.data.floor_number;i++){
            this.floorList.push(i); 
        }
        this.formInline.level=this.floorList;
      });
    },
    // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // // 获取自习室个数
    // getRoom(){
    //     this.$axios({
    //     url: "http://localhost/generalize/showgeneralize",
    //     method: "get",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((res) => {
    //     // for(var i=0;i<res.data.length;i++){
    //     //    this.roomList.push(res.data[i].roomname)
    //     // }
    //   //  this.formInline.room=this.roomList;
    //   });
    // },
   
   
    // 获取座位数据
    getSeat(){
        this.$axios({
        url: "http://localhost/seat/showseat",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          page: this.currentPage2,
        },
      }).then((res) => {
        this.tableList=res.data
      
      });
    },

    // 提交座位信息
    onSubmit() {
       this.$axios({
        url: "http://localhost/seat/submit",
        method: "post",
        data: {
         formInline:this.formInline
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        alert("数据提交成功");
        this.getSeat();
        
      });
    },
    // 查询座位信息
    onSelect() {},
    // 打开弹窗
    handleEdit(index, row) {
      this.dialogVisible=true;
      this.row=row._id
    },
    // 编辑、修改座位信息
    emitSeat(){
        console.log(this.formInline1);
        this.$axios({
        url: "http://localhost/seat/emitdata",
        method: "post",
        data: {
         formInline1:this.formInline1,
         row:this.row
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
         this.dialogVisible = false
        alert("数据修改成功");
        this.getSeat();
        
      });
       
    },
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row);
       this.$axios({
        url: "http://localhost/seat/delete",
        method: "post",
        data: {
          id:row._id
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        alert("数据删除成功");
        this.getSeat();
      });
    },
  },
};
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
.slotEmit {
  width: 90%;
  margin: auto;
  margin-top: 10px;
}
.seatShow {
  width: 90%;
  margin: auto;
}
.el-input {
  width: 100px;
}
.el-select {
  width: 100px;
}
/* .el-form-item{
    width: 200px;
} */
/* .el-form-item__content{
    width: 100px !important;
} */
</style>