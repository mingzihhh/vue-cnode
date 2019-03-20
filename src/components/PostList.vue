<template>
<div class="posts-list">
    <div class="loading" v-if='isLoading'>
        <img src="../assets/loading.gif" alt="">
    </div>
    <div class="posts" v-else>
        <ul>
            <li class="classify-bar">
                <div>
                    <a v-for='(tag,index) in tagList' :key='index' href='#' :class="['tag-tab',{'current-tab': index === currentIndex }]" @click="changeList(index)">{{tag}}</a>
                </div>
            </li>
            <li v-for="(post,index) in posts" :key="index" class="cell">
                <router-link :to="{name: 'userInfo',params:{name: post.author.loginname}}">
                    <a href="#" class="user-avatar"><img :src="post.author.avatar_url" alt=""></a>
                </router-link>           
                <div class="all-count">
                    <span class="reply-count">{{post.reply_count}}</span>
                    / <span class="visit-count">{{post.visit_count}}</span>
                </div> 
                <span class="last-reply">{{post.last_reply_at | formatDate }}</span>
                <div class="topic-title-wrapper">
                    <span :class="[{putGood: (post.good === true),putTop: (post.top === true),topiclistTab: (post.good != true && post.top != true)}]">
                        {{post | formatTab }}
                    </span>
                    <router-link :to = "{name: 'postContent', params: {id: post.id,name:post.author.loginname}}">
                        <span class="title"><a href="#">{{post.title}}</a></span>
                    </router-link>
                    
                </div>    
            </li>
            <li>
                <Pagination @handle='renderList'></Pagination>
            </li>
        </ul>
    </div>

</div>
    
</template>
<script>
import Pagination from '../components/Pagination'
export default {
    name: 'PostList',
    data() {
        return {
            tagList: ['全部','精华','分享','问答','招聘'],
            tabList: ['good','share','ask','job'],
            isLoading: false,
            posts: [],
            currentIndex: 0,
            tab: '',
            page: 1,
        }
    },
    components: {
        Pagination
    },
    methods: {
        getData() {
            this.$http.get('https://cnodejs.org/api/v1/topics',{
                params: {
                    page: this.page,
                    limit: 20,
                    tab: this.tab
                   
                }
            }).then(res => {
                console.log(res.data.data)
                this.isLoading = false
                this.posts = res.data.data
            }).catch(err => {
                console.log('error...')
            })
        },
        //切换列表
        changeList(index) {
            this.currentIndex = index
            if(this.currentIndexIndex !=0){
                this.tab = this.tabList[this.currentIndex - 1]
                this.getData()
            }else {
                this.tab = ''
                this.getData()
            }
        },
        //换页重新渲染
        renderList(page) {
            this.page = page
            this.getData()

        }
    },
    beforeMount() {
        this.isLoading = true
        this.getData()
    }
        
}
</script>
<style scoped>

a {
    text-decoration: none;
    color: #333;
}
ul {
    list-style: none;
}
ul li:not(:first-child) {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    line-height: 30px;
}
ul li:not(:first-child):hover {
    background-color: #f6f6f6;
}
.loading{
    width: 40px;
    height: 40px;
    margin: 10px auto;
}
.loading img {
    width: 100%;
    border-radius: 50%;
}
.classify-bar {
    background-color: #f6f6f6;
    padding: 10px;
    font-size: 14px;
}
.posts-list {
    margin-right: 305px;
}
.tag-tab {
    color: #80bd01;
    margin: 0 10px;
}
.tag-tab.current-tab {
    padding: 3px 4px;
    border-radius: 3px;
    background-color: #80bd01;
    color: #fff;
}
.posts img {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 5px;
}
.all-count {
    float: left;
    width: 65px;
    text-align: center;
    font-size: 10px;
}
.reply-count {
    color: #9e78c0;
    font-size: 14px;
}
.visit-count {
    color: #b4b4b4;
}
.topic-title-wrapper {
    width: 72%;
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
</style>


