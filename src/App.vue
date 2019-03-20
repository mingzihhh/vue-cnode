<template>
  <div id="app">
    <Header></Header>
    <div class="main clearfix">
          <router-view name="aside"></router-view>
           <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/header'
import PostList from './components/PostList'


export default {
  name: 'App',
  components: {
    Header,
    PostList
  },
  created(){
    this.$store.dispatch('checkLogin')
  }
}
</script>

<style>
@import url('https://at.alicdn.com/t/font_1091613_j3px90p3mdn.css');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app{
  height: 100%;
}
body {
  color: #333;
  word-break: break-word;
  font-size: 14px;
}
a {
    color: #08c;
    text-decoration: none;
}
#app {
  background-color: #e1e1e1;
}
.main {
    border-radius: 3px;
    padding: 15px 6%;
    background-color: #e1e1e1;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;

}
</style>
