import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    managename:localStorage.getItem("managename"),
    giid:''
  },
  mutations: {
    //  存储用户账号名
     getManageName(state,payload){
      state.managename=payload.managename
      },
      // update(state,payload) {
      //     state.userInfo=payload.userInfo
      // },
      // 退出
      logout(state){
        localStorage.removeItem("state.managename")
        state.username=""
      },
      uploadImg(state,payload){
         state.giid=payload.giid
      }
  },
  actions: {
  },
  modules: {
  }
})
