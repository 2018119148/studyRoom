<template>
  <div class="notice">
     <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|公告编辑</b>
    </div>
    <div class="notice_issue">
      <div class="issue_box">
         <el-input placeholder="请输入公告题目" v-model="title">
      </el-input>
      <div style="margin: 20px 0"></div>
    <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 4 }"
        placeholder="请输入公告内容"
        v-model="content"
      >
      </el-input>
      <el-button type="primary" @click="submitNotice" class="notice_btn1" >发布公告</el-button>
      </div>
    
    </div>
    <div class="notice_text">
      <p class="issue_top">已发布的公告</p>
       <el-table
    :data="noticeData"
    style="width: 100%">
   <el-table-column
      label="标题"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.title}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="内容"
      width="600">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="deleteNotice(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      noticeData:[]
    };
  },
  // 页面创建后数据渲染
  created: function () {
    this.showNotice();
  },

  components: {},

  computed: {},

  methods: {
      // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 提交公告
    submitNotice() {
      if (this.title !== "" && this.content !== "") {
        this.$axios({
          url: "http://localhost/notice/addnotice",
          method: "post",
          data: {
            title: this.title,
            content: this.content,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res);
          alert("公告发布成功");
        });
      }else{
        alert('请完善公告信息！！！')
      }
    },
    // 获取公告数据
    showNotice(){
      this.$axios({
          url: "http://localhost/notice/shownotice",
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          this.noticeData=res.data;
          this.showNotice();
        });
    },
    // 删除公告
    deleteNotice(e,row){
      console.log(row._id);

       this.$axios({
          url: "http://localhost/notice/deletenotice",
          method: "post",
          data: {
            id:row._id
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
         this.showNotice();
        });
    }
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
.notice_issue {
  width: 80%;
  height: 180px;
  margin: auto;
  padding-top: 10px;
  

}
.notice_btn1{
  margin-left: 20px;
}
.el-input{
  width: 70%;
}
.el-textarea{
  width: 70%;
}
.notice_text{
  width: 80%;
  margin: auto;
  text-align: center;
}
ul{
  background-color: white;
  width: 90%;
  margin:auto;
  
}
li{
  list-style: none;
  margin: 20px 0px;
}
.notice_title{
  display: flex;
}
span{
  
  text-align: center;
  height: 50px;
  width: 100px;
  line-height: 50px;
}
p{
  margin:0px  30%;

 height: 50px;
 
 line-height: 50px;
}
button{
  width: 80px;
  height: 40px;
  background-color: red;
  margin-top: 10px;
 
  border: none;
  outline: none; 
  color: white;
}
.notice_btn1{
  text-align: center;
  width: 100px;
  height: 40px;
   
}
.notice_content{
  height: 180px;
  overflow: auto;
}
.issue_top{
  font-size: 20px;
}
</style>