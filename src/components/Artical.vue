<template>
    <div class="artical">
        <div class="loading" v-if='isLoading'>
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-else> 
            <div class="artical-panel">
                <div class="topic-header clearfix">
                    <span class="topic-full-title">
                        <span v-if="(tag != '')" class="topic-tag">
                            {{tag}}
                        </span> 
                        {{post.title}}
                    </span>
                    <ul class="topic-details">
                        <li>• 发布于 {{post.create_at | formatDate}} </li>
                        <li>• 作者 {{post.author.loginname}} </li>
                        <li>• {{post.visit_count}} 次浏览</li>
                        <li>• 来自 {{post | formatTab}} </li>
                    </ul>
                    <button  v-if="isLogin" @click = "collectArtical(post.id,accessToken)" :class="{collect:post.is_collect}">{{post.is_collect?'取消收藏':'收藏'}}</button>
                </div>
                <div class="markdown topic-content" v-html="post.content">
                </div>
            </div>

            <div class="topic-reply">
                <div class="header">{{post.replies.length}} 回复</div>
                <div v-for="(reply,index) in post.replies" :key="index" class="reply-area">
                    <div class="reply-header" :id = "reply.id">
                        <router-link :to="{name:'userInfo',params:{name:reply.author.loginname}}">
                            <a href="#" class="user-avatar"><img :src="reply.author.avatar_url" alt=""></a> 
                        </router-link>
                        <router-link :to="{name:'userInfo',params:{name:reply.author.loginname}}">
                            <a href="#"><span class="reply-author">{{reply.author.loginname}}</span></a> 
                        </router-link>                    
                        <a :href="'#' + reply.id" class="toTop">
                            <span name="slide">{{index+1}}楼• {{reply.create_at | formatDate}}</span>
                        </a>
                        <span v-if="reply.author.loginname === post.author.loginname" class="is-author">作者</span>
                        <div v-if="(reply.ups.length > 0)" class="reply-up">
                            <i class="iconfont icon-good"></i>
                            <span>{{reply.ups.length}}</span>
                        </div>
                    </div>
                    <div v-html="reply.content" class="reply-content markdown" >
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'artical',
    data(){
        return {
            isLoading: false,
            post: {},//当前文章的内容
            tag: ''
        }
    },
    computed: {
        ...mapState(['isLogin','accessToken'])
    },
    methods: {
        getArtical() {
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,{
                params: {
                    accesstoken: this.accessToken
                }
            })
            .then(ret => {
                console.log(ret.data.data)
                if(ret.data.success === true){
                    this.isLoading = false
                    this.post = ret.data.data
                    this.detectTag(this.post)
                }
            })
            .catch(err => {
                console.log(err)
            })

        },
        detectTag() {
            if(this.post.top === true){
                this.tag = '置顶'
            }else if(this.post.good === true){
                this.tag = '精华'
            }
        },
        collectArtical(id,ak){
            if(!this.post.is_collect){
                this.$http.post('https://cnodejs.org/api/v1/topic_collect/collect',{
                    accesstoken: ak,
                    topic_id: id
                })
                .then(ret => {
                    console.log(ret)
                    if(ret.data.success === true){
                         this.post.is_collect = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else {
                this.$http.post('https://cnodejs.org/api/v1/topic_collect/de_collect',{
                    accesstoken: ak,
                    topic_id: id
                })
                .then(ret => {
                    console.log(ret)
                    if(ret.data.success === true){
                        this.post.is_collect = false
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
            console.log(this.isCollect)
        }
    },
    beforeMount() {
        this.isLoading = true
        this.getArtical()
    },
    watch: {
        '$route'(to,from){
            this.getArtical()
        }
    }
    
    
}
</script>

<style>
    @import url('../assets/markdown-github.css');
    .loading{
    width: 40px;
    height: 40px;
    margin: 10px auto;
    }
    .loading img {
        width: 100%;
        border-radius: 50%;
    }
    .artical {
        margin-right: 305px;
        border-radius: 5px;
        overflow: hidden;
    }
    .artical-panel {
        background-color: #fff;
        border-radius: 3px;
        margin-bottom: 10px;
    }
    .topic-header {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .topic-header button {
        float: right;
        background-color: #80bd01;
        border: 1px solid #80bd01;
        color: #fff;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
        padding: 0 2px;
        width: 60px;
        height: 35px;
        font-size: 14px;
        letter-spacing: 3px;
    }
    .topic-header button:hover {
        background-color: #7db405;
    }
    .topic-header .collect {
        width: 100px;
        background-color: #aaa;
        border: 1px solid #aaa;
    }
    .topic-full-title {
        display: inline-block;
        width: 75%;
        font-size: 22px;
        font-weight: bold;
        margin: 8px 0;
        line-height: 130%;
        vertical-align: bottom;
    }
    .topic-tag {
        background-color: #80bd01;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        padding: 1px 2px;
        margin-right: 5px;
    }
    .topic-details {
        display: inline-block;
    }
    .topic-details li {
        display: inline-block;
        font-size: 12px;
        color: #838383
    }
    .topic-content {
        padding: 10px 20px;
    }
    .markdown {
        font-size: 14px;
        line-height: 2em; 
    }
    .markdown p {
        white-space: pre-wrap;
    }
    .markdown img {
        max-width: 100%;
    }
    .topic-reply .header {
        padding: 10px;
        background-color: #f6f6f6;
    }
    .reply-area {
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
        padding: 10px;
    }
    .reply-header {
        line-height: 20px;
        font-size: 12px;
    }
    .reply-header img {
        width: 30px;
        height: 30px;
        vertical-align: top;
        border-radius: 3px;
    }
    .user-avatar {
        float: left;
        margin-right: 10px;
    }
    .reply-author {
        color: #666;
        font-weight: bold;
    }
    .is-author {
        background-color: #6ba44e;
        color: #fff;
        padding: 1px;
    }
    .reply-up {
        float: right;
        color: grey;
    }
    .reply-content {
        margin-left: 50px;
        font-size: 15px;
    }
    .toTop:hover {
        text-decoration: underline;
        color: #025680;
    }

</style>


