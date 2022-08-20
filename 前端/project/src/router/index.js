import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Notice from '../components/Concent/notice.vue'
import Generalize from '../components/Concent/generalize.vue'
import Floor from '../components/Concent/floor.vue'
import UploadImg from '../components/Concent/uploadImg.vue'
import Seat from '../components/Concent/seat.vue'
import Order from '../components/Concent/order.vue'
import Blacklist from '../components/Concent/blacklist.vue'
import Homepage from '../components/Concent/homepage.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/login',component: Login},
  {path: '/register',component: Register},
  {path: '/',component: Home,meta: {requireAuth: true},redirect:'/homepage',
  children:[{path:'/notice',
      component:Notice,
      meta: {requireAuth: true}},
    {path:'/generalize',
      component:Generalize,
      meta: {requireAuth: true} },
    {path:'/floor',
      component:Floor,
      meta: {requireAuth: true}},
    {path:'/seat',
      component:Seat,
      meta: {requireAuth: true}},
    {path:'/uploadimg',
      component:UploadImg,
      meta: {requireAuth: true}},
    {path:'/order',
      component:Order,
      meta: {requireAuth: true}},
    {path:'/blacklist',
     component:Blacklist,
      meta: {requireAuth: true}},
    { path:'/homepage',
      component:Homepage,
      meta: {requireAuth: true} },
    ]},
  
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("token") == 'true') { // 判断本地是否存在token
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/login'
      })
    }
  } else {
    if(sessionStorage.getItem("token") == 'true'){
      next('/');
    }else{
      next();
    }
  }
});

// 路由重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
      }
export default router
