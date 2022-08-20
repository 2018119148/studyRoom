<template>
  <!-- 自习室大概信息 -->
  <div class="generalize">
    <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|自习室编辑</b>
    </div>
        <div class="generalize_issue">
          <div id="issue">发布自习室</div>
          <form
            method="post"
            action="http://localhost/generalize/generalize_commit"
            enctype="multipart/form-data"
            id="form1"
          >
            <p>
              <span>自习室名：</span
              ><input
                type="text"
                name="roomname"
                id="roomname"
                placeholder="请输入自习室名"
              />
            </p>
            <p>
              <span>楼层数：</span
              ><input
                type="text"
                name="number"
                id="number"
                placeholder="请输入自习室楼层数"
              />
            </p>
            <p>
              <span>自习室图：</span
              ><input
                type="file"
                name="img"
                placeholder="请输入自习室图"
                id="img"
              />
            </p>
            <p>
              <span>地址：</span
              ><input
                type="text"
                placeholder="请输入详细地址"
                name="address"
                id="address1"
              />
            </p>
            <p>
              <input type="submit" value="提交" class="btn2" @click="btn2" />
            </p>
          </form>
        </div>
        <div class="generalize_data">
          <el-table
            :data="generalizeList"
            style="width: 100%"
            height="150"
            :default-sort="{ prop: '_id', order: 'descending' }"
          >
            <el-table-column prop="roomname" label="自习室名" width="150">
            </el-table-column>
            <el-table-column label="自习室图片" width="200">
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 70px"
                  :src="scope.row.room_pic"
                ></el-image>
              </template>
            </el-table-column>
             <el-table-column prop="floor_number" label="楼层" width="80">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="300">
            </el-table-column>
            <el-table-column label="操作" width="210">
              <template slot-scope="scope">
                <el-button
                  @click="deletegeneralize(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="emitgeneralize(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="uploadImg(scope.row)"
                  >上传环境图片</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
       <div>
          <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="自习室名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="emitData">确 定</el-button>
      </span>
    </el-dialog>

       </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        dialogVisible:false,
         form: {
          name: '',
          number:'',
          address:''
        },
      generalizeList: [],
      id: "",
    };
  },
  created: function () {
    this.showGeneralize();
    // this.showImgs();
  },

  methods: {
    uploadImg(e){
         console.log(e._id);
          this.$store.commit({
          type:'uploadImg',
          giid:e._id
        })
         this.$router.push('./uploadImg');

    },
  
    btn2() {
      this.showGeneralize();
    },
    // 展示数据
    showGeneralize() {
      this.$axios({
        url: "http://localhost/generalize/showgeneralize",
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.generalizeList.push(res.data);
        console.log(res);
      });
    },
    //   删除数据
    deletegeneralize(e) {
      this.$axios({
        url: "http://localhost/generalize/deletedata",
        method: "post",
        data: {
          row: e,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        alert("数据删除成功");
        this.showGeneralize();
      });
    },
    // 弹出编辑框
    emitgeneralize(e) {
      this.dialogVisible=true;
      this.id = e._id;
    },
    // 提交修改订单，关闭弹窗
    emitData() {
      this.$axios({
        url: "http://localhost/generalize/generalize_emit",
        method: "post",
        data: {
          id: this.id,
          form:this.form
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.dialogVisible=false
        alert("数据修改成功");
        this.showGeneralize();
      });
    },
    // 返回上一级
    goback() {
      this.$router.go(-1);
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
.generalize_data {
  width: 80%;
  margin: 50px auto;
  
  
}
.box {
  width: 500px;
  height: 250px;
  background-color: rgb(241, 233, 233);
  position: absolute;
  margin: 100px 30%;
  z-index: 100;
  border: 5px solid white;
  box-shadow: 0px 0px 10px 5px #aaa;
}
span {
  font-size: 17px;
  margin-left: 20px;
}
input {
  width: 300px;
  height: 30px;
}
p {
  margin: 5px 0px;
}
.btn1 {
  width: 80px !important;
  height: 30px;
  margin-left: 45%;
  background-color: red;
  border: none;
}
#form1 {
  margin-top: 20px;
}
#emit_box {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}
.generalize_issue {
  margin-left: 30%;
  margin-top: 15px;
  margin-bottom: 20px;
  width: 500px;
  border: 1px solid white;
  box-shadow: 0px 0px 10px 5px #aaa;
}
.btn2 {
  width: 100px;
  height: 40px;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  margin-left: 40%;
}
#issue {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.upload-demo{
  width: 80%;
  margin: auto;
}
.el-upload__tip{
  font-size: 10px;
}
.el-table-column{
  text-align: center;
}
</style>