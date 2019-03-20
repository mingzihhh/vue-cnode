<template>
    <div class="header">
      <router-link :to="{name:'root'}">
         <img src="../assets/cnodejs_light.svg" alt="">
      </router-link>
     
      <ul>
        <li>        
            <router-link to="/">
                  <a href="#"><span>主页</span></a> 
            </router-link>
        </li>
        <li v-if='isLogin'>
          <router-link :to="{name:'message',params: {ak: accessToken}}">
             <a href="#">未读消息 <span v-if="messageCount>0">{{messageCount}}</span></a>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <a href="#">关于</a>
          </router-link>
        </li>
        <li v-if='isLogin'>
          <a href="#" @click="logout">退出</a>
        </li>
        <li v-else>
          <router-link :to="{name: 'login'}">
            <a href="#">登录</a>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "Header",
    computed: {
      ...mapState(['isLogin','accessToken','messageCount'])
    },
    methods: {
      logout(){
        this.$message({
          message: '已退出！',
          center: true
        })
        this.$store.commit('logout')
  
      }
    }
}
</script>

<style scoped>
  .header {
    background-color: #5a5555;
    height: 50px;
    font-size: 13px;
  }
  img {
    max-width: 120px;
    margin-top: 10px;
    margin-left: 15px;
  }
  ul {
    list-style: none;
    float: right;
    margin: 4px;
  }
  li {
    display: inline-block;
    padding: 10px 15px;
    color: #ccc;
  }
  li a:hover {
    color: #fff;
  }
  a {
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
  }
</style>
