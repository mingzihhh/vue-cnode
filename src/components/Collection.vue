<template>
<div class="collection">
    <section>
        <div class="info-header">
            <router-link to="/">
            <a href="#"><span>主页</span></a> 
            </router-link>   
            / {{userName}} 收藏的话题
        </div>
        <div class="info-details">
            <div v-if='collection.length === 0'>暂无收藏</div>
                <ul>
            <li v-for="(post,index) in collection" :key="index" class="cell">
                <router-link :to="{name: 'userInfo',params:{name: post.author.loginname}}">
                    <a href="#" class="user-avatar"><img :src="post.author.avatar_url" alt=""></a>
                </router-link>           
                <div class="all-count">
                    <span class="reply-count">{{post.reply_count}}</span>
                    / <span class="visit-count">{{post.visit_count}}</span>
                </div> 
                <span class="last-reply">{{post.last_reply_at | formatDate }}</span>
                <div class="topic-title-wrapper">
                    <router-link :to = "{name: 'postContent', params: {id: post.id,name:post.author.loginname}}">
                        <span class="title"><a href="#">{{post.title}}</a></span>
                    </router-link>
                    
                </div>    
            </li>
        </ul>
        </div>

    </section>
</div>
    
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'Collection',
    data(){
        return {
            collection: [],
            userName: ''
        }
    },
    methods: {
        getCollection(){
            console.log(this.userInfo)
            this.$http.get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.name}`)
            .then(ret => {
                console.log(ret)
                if(ret.data.success === true){
                    this.collection = ret.data.data
                    this.userName = this.$route.params.name
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.getCollection()
    }


    
}
</script>

<style scoped>
.collection section {
margin-bottom: 20px;
border-radius: 3px;
overflow: hidden;
}
.info-header {
padding: 10px;
background-color: #f6f6f6;
border-top: 1px solid #f0f0f0;
/* border-radius: 3px 3px 0 0; */

}
.info-header span {
color: #80bd01;
}
.info-details {
line-height: 2em;
background-color: #fff;
/* border-radius: 0 0 3px 3px; */
}
.collection img {
float: left;
width: 30px;
height: 30px;
border-radius: 5px;
}
.all-count {
    float: left;
    text-align: center;
    font-size: 10px;
    width: 80px;
}
.reply-count {
    color: #9e78c0;
    font-size: 14px;
}
.visit-count {
    color: #b4b4b4;
}
.topic-title-wrapper {
    margin: 0 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.title {
    font-size: 16px;
    padding-left: 3px;
}
.title:hover {
    text-decoration: underline;
}
.last-reply {
    float: right;
    font-size: 11px;
    color: #778087;
    min-width: 50px;

}
.putGood,.putTop {
    background-color: #80bd01;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
}
.topiclistTab {
    background-color: #e5e5e5;
    color: #999;
    font-size: 12px;
    border-radius: 3px;
    padding: 2px,4px;
}
ul li {
padding: 10px;
border-bottom: 1px solid #ccc;
background-color: #fff;
line-height: 30px;
}
ul li a {
    color: #333;
}
ul li a:actived {
    color: #aaa;
}
ul li:hover {
    background-color: #f6f6f6;
}

</style>


