<template>
<div class="about markdown">
   <h1>基于Cnodejs提供的api，重写cnode社区</h1> 
    <p>技术栈：vue.js + vue-cli + vuex +vue-router + axios + ES6 + elementUI</p>
    <ul>
        <li>实现功能：</li>
        <li>首页列表，分页加载</li>
        <li>按标签查看</li>
        <li>查看文章详情和评论</li>
        <li>用户信息</li>
        <li>登陆，刷新可保持登陆状态</li>
        <li>查看个人主页</li>
        <li>消息提醒</li>
        <li>查看消息列表</li>
        <li>收藏文章</li>
        <li>取消收藏</li>
        <li>退出</li>
        <li>关于</li>
    </ul>
    <p>github链接：<a href="https://github.com/mingzihhh/vue-cnode">https://github.com/mingzihhh/vue-cnode</a></p>
</div>
</template>

<script>
export default {
    name: 'About'
    
}
</script>

<style>
@import url('../assets/markdown-github');
.about {
    background-color: #fff;
    padding: 20px;
    line-height: 1.5em;
    width: 75%;
    margin: 0 auto;
}
.about h1 {
    font-size: 30px;
}
.about li,p {
    font-size: 16px;
}

</style>


