<template>
  <div class="uploadimg">
      <div @click="goback()" class="goback">
      <span style="line-height: 50px; font-size: 10px; cursor: pointer">
        <i class="el-icon-back"></i>
        返回
      </span>
      <b style="color: #1ab">|自习室环境图片上传</b>
    </div>
     <div>
         <el-upload
          class="upload-demo"
          action=""
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :before-upload="BeforeUpload"
           :http-request="Upload"
           multiple
          :limit="5"
          name="file"
          :file-list="fileListdata"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <span slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb,不超过5张图
          </span>
        </el-upload>
     </div>
  </div>
</template>

<script>
export default {
  data () {
   return {
      fileListdata: [], //图片列表
      newFile:new FormData(), //   1. 定义一个newFile变量（FormData 对象） 
      giid:''
   };
  },

  components: {},

  computed: {},

 created() {
   
    this.giid = this.$store.state.giid;
     this.showImgs(this.giid);
  },
  methods: {
       // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 图片上传之前
    BeforeUpload(file){
       if(file){
          this.newFile.append('file',file); //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中。 
          this.newFile.append('giid',this.giid)
           console.log(this.newFile)
       }else{
         return false;
       }     
      },

    // 图片上传
     Upload(file){
       if(file){
          const newData= this.newFile;
          this.$axios({
          url:'http://localhost/img/imgload',
          method:'post',
          data: newData,
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        .then(res => {
          alert("图片上传成功")
          console.log(giid);
          this.showImgs(this.giid);
         this.newFile=new FormData()
        }).catch(err => {
          console.log(err)
        })
       }
      },
    // 图片显示
    showImgs(e){
      this.fileListdata=[];
      this.$axios({
        url: "http://localhost/img/showImg",
        method: "get",
        params:{
          giid:e,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // this.fileListdata=res.data
        const url='';
        const name=""
        for(var i=0;i<res.data.length;i++){
               const a={url:res.data[i].img,name:res.data[i].name}
               this.fileListdata.push(a)
        }
      });
    },
    //删除图片时
    handleRemove(e) {
      console.log(e.url);
      this.$axios({
        url: "http://localhost/img/imgdelete",
        method: "post",
        data: {
          url:e.url,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        alert("图片删除成功");
      });

       
    },
    // 删除图片之前的提式
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
  border-bottom: 1px solid rgb(175, 171, 171);
  color: #1a72b6;
}
.upload-demo{
  width: 80%;
  margin: auto;
}
.el-upload__tip{
  font-size: 10px;
}
</style>