import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Artical from '../components/Artical'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'
import AdBar from '../components/AdBar'
import Login from '../components/login'
import Message from '../components/Message'
import Collection from '../components/Collection'
import About from '../components/About'


Vue.use(Router)

export default new Router({
  module: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList,
        aside: AdBar
      }
    },
    {
      name: 'postContent',
      path:'/topic/:id&author:name',
      components: {
        main : Artical,
        aside: SlideBar

      }
   },
   {
     name: 'userInfo',
     path: '/user/:name',
     components: {
        main: UserInfo
     }
   },
   {
     name: 'login',
     path: '/login',
     components: {
       main: Login
     }
   },
   {
     name: 'message',
     path: '/messages/:ak',
     components: {
       main: Message,
       aside: AdBar
     }
   },
   {
     name: 'collect',
     path: '/collect/:name',
     components: {
       main: Collection
     }
   },
   {
     name: 'about',
     path: '/about',
     components: {
       main: About
     }
   }
  

  ]
})
