<template>
    <div class="adBar">
        <section v-if="isLogin" class="user-details">
            <p class="info-header">个人信息</p>
            <div class="info-details">
                 <router-link :to="{name: 'userInfo',params:{name: userInfo.loginname}}">
                    <a href="#"><img :src="userInfo.avatar_url" alt=""></a>
                </router-link>
                <span class="author">{{userInfo.loginname}}</span>
            </div>   
        </section>
        <section v-else class="details">
            <p>CNode：Node.js专业中文社区</p>
            <a href="https://github.com/mingzihhh/vue-cnode">点击查看GitHub源码</a>
        </section>
        <section class="ad-panel ad">
            <a href="https://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc_540_130&amp;utm_campaign=huodong&amp;utm_content=gift&amp;ytag=cnodejs" target="_blank" class="banner sponsor_outlink" data-label="ucloud-banner">
                <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS">
            </a>
            <div class="sep10"></div>  
            <a href="https://0x7.me/T4BdE" target="_blank" class="banner sponsor_outlink" data-label="qiniu-sidebar">
                <img src="//static.cnodejs.org/FvSQHGgGVh_tkomqIFQ0MDEH9wrg">
            </a>
            <div class="sep10"></div>
            <a href="https://jobs.aftership.com/r/cnodejs" target="_blank" class="banner sponsor_outlink" data-label="aftership">
                <img src="//static.cnodejs.org/FjpEWk5hZd8DToyHKDbJ4masolIW">
            </a>
            <div class="sep10"></div> 
            <a href="https://www.aliyun.com/product/nodejs?ref=cnode" target="_blank" class="banner sponsor_outlink" data-label="alinode">
                <img src="//static.cnodejs.org/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_">
            </a>
        </section>
        <section class="score-rank">
            <div class="info-header">积分榜 Top10</div>
            <ol>
                <li>
                    <span class="top_score">21365</span>
                    <span class="user_name"><a href="#">i5ting</a></span>
                    </li>
                    <li>
                    <span class="top_score">15390</span>
                    <span class="user_name"><a href="#">alsotang</a></span>
                    </li>
                    <li>
                    <span class="top_score">9350</span>
                    <span class="user_name"><a href="#">leapon</a></span>
                    </li>
                    <li>
                    <span class="top_score">8760</span>
                    <span class="user_name"><a href="#">jiyinyiyong</a></span>
                    </li>
                    <li>
                    <span class="top_score">7835</span>
                    <span class="user_name"><a href="#">atian25</a></span>
                    </li>
                    <li>
                    <span class="top_score">7070</span>
                    <span class="user_name"><a href="#">yakczh</a></span>
                    </li>
                    <li>
                    <span class="top_score">6730</span>
                    <span class="user_name"><a href="#">im-here</a></span>
                    </li>
                    <li>
                    <span class="top_score">6075</span>
                    <span class="user_name"><a href="#">DevinXian</a></span>
                    </li>
                    <li>
                    <span class="top_score">5740</span>
                    <span class="user_name"><a href="#">chapgaga</a></span>
                    </li>
                    <li>
                    <span class="top_score">5335</span>
                    <span class="user_name"><a href="#">magicdawn</a></span>
                    </li>
            </ol>
        </section>
        <section class="ad-panel">
            <div class="info-header">友情社区</div>
            <div class="links">
                <a href="https://ruby-china.org/" target="_blank">
                    <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png">
                </a>
                <div class="sep10"></div>
                <a href="http://golangtc.com/" target="_blank">
                    <img src="//static2.cnodejs.org/public/images/golangtc-logo.png">
                </a>
                <div class="sep10"></div>
                <a href="http://phphub.org/" target="_blank">
                    <img src="//static2.cnodejs.org/public/images/phphub-logo.png">
                </a>
                <div class="sep10"></div>
                <a href="https://testerhome.com/" target="_blank">
                    <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK">
                </a>
            </div>    
        </section>
        
    </div>
    
</template>
<script>
import {mapState} from 'vuex';
export default {
    name: 'ad-bar',
    computed: {
        ...mapState(['isLogin','userInfo'])
    }
    
}
</script>


<style scoped>
.adBar {
    float: right;
    width: 290px;
    margin-left: 30px;
}
.adBar section {
    margin-bottom: 15px;
}
.info-details {
    padding: 10px;
    line-height: 2em;
    background-color: #fff;
}
.info-details img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    margin-right: 10px;
    vertical-align: middle;
}
.info-details .author {
    color: #778087;
    font-size: 16px;
}
.details {
    background-color: #fff;
    padding: 10px;
}
.details p {
    line-height: 2em;
    margin-bottom: 10px;
}
.details a {
    display: inline-block;
    padding: 3px 10px;
    background-color: #5bc0de;
    color: #fff;
    line-height: 2em;
    letter-spacing: 2px;
    border-radius: 3px;
}
.score-rank ol {
    width: 100%;
    padding: 10px;
    list-style:none;
    padding: 10px;
    background-color: #fff;
    line-height: 30px;
    color: #778087;
}
.score-rank ol a {
    color: #778087;
    margin-left: 10px;
}
.ad-panel {
    background-color: #fff;
}
.ad-panel.ad {
    padding: 10px;
}
.ad-panel .links {
    padding: 10px;
}
.ad-panel img {
    max-width: 100%;
}
.ad-panel .links img {
    max-width: 60%;
}
.ad-panel .sep10 {
    height: 10px;
}
.info-header {
    padding: 10px;
    background-color: #f6f6f6;
}



</style>
