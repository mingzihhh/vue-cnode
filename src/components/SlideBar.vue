<template>
    <div class="slideBar">
        <section class="user-details">
            <p class="info-header">作者</p>
            <div class="info-details">
                 <router-link :to="{name: 'userInfo',params:{name: info.loginname}}">
                    <a href="#"><img :src="info.avatar_url" alt=""></a>
                </router-link>
                <span class="author">{{info.loginname}}</span>
                <p>{{info.score}} 积分</p>
            </div>   
        </section>
        <section class="ad-panel">
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
        <section class="user-topics">
                <div class="info-header">作者最新话题</div>
                <ul>
                    <li v-for="(topic,index) in info.recent_topics.slice(0,5)" :key="index" class="clearfix">
                        <div class="topic-title-wrapper">
                            <router-link :to = "{name: 'postContent', params: {id: topic.id,name: topic.author.loginname}}">
                                <span class="title"><a href="#">{{topic.title}}</a></span>
                            </router-link>
                            
                        </div> 
                    </li>
                </ul>
        </section>
        
    </div>
    
</template>
<script>
export default {
    name: 'slide-bar',
    data() {
        return {
            info: {}
        }
    },
    methods: {
        getUserInfo() {
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(ret => {
                this.isLoading = false
                console.log(ret.data.data)
                this.info = ret.data.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },    
    beforeMount() {
        this.getUserInfo()
    }
    
}
</script>


<style scoped>
.slideBar {
    float: right;
    width: 290px;
    margin-left: 30px;
}
.slideBar section {
    margin-bottom: 15px;
}
.slideBar ul {
    width: 100%;
    padding: 10px;
    list-style:none;
    padding: 10px;
    background-color: #fff;
    line-height: 30px;
}
.slideBar ul>li .topic-title-wrapper {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.info-header {
    padding: 10px;
    background-color: #f6f6f6;
    border-top: 1px solid #f0f0f0;
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
.user-topics a{
    color: #778087;
}
.ad-panel {
    padding: 10px;
    background-color: #fff;
}
.ad-panel img {
    max-width: 100%;
}
.ad-panel .sep10 {
    height: 10px;
}



</style>
