<template>
    <div class="userInfo">
        <div class="loading" v-if='isLoading'>
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="userInfomation">
            <section class="user-details">
               <div class="info-header">
                 <router-link to="/">
                  <a href="#"><span>主页</span></a> /
                 </router-link>   
                 </div>
               <div class="info-details">
                    <img :src="post.avatar_url" alt="">
                    <span class="author">{{post.loginname}}</span>
                    <p>{{post.score}} 积分</p>
                    <p>
                      <router-link :to="{name: 'collect',params: {name: post.loginname}}">
                        <a href="#">查看话题收藏</a>
                      </router-link>
                    </p>
                    <p class="register">注册时间 {{post.create_at | formatDate}}</p>
               </div>
            </section>
            <section class="user-topics">
                <div class="info-header">最近创建的话题</div>
                <div v-if='post.recent_topics.length === 0' class="no-info">无话题</div>
                <ul>
                    <li v-for="(topic,index) in post.recent_topics.slice(0,5)" :key="index" class="clearfix">
                        <router-link :to="{name: 'userInfo',params:{name: topic.author.loginname}}">
                            <a href="#" class="user-avatar"><img :src="topic.author.avatar_url" alt=""></a>       
                        </router-link>   
                        <span class="last-reply">{{topic.last_reply_at | formatDate }}</span>
                        <div class="topic-title-wrapper">
                            <router-link :to = "{name: 'postContent', params: {id: topic.id}}">
                                <span class="title"><a href="#">{{topic.title}}</a></span>
                            </router-link>
                            
                        </div> 
                    </li>
                </ul>

            </section>
            
            <section class="user-replies">
                <div class="info-header">最近参与的话题</div>
                <div v-if='post.recent_replies.length === 0' class="no-info">无话题</div>
                <ul v-else>
                    <li v-for="(topic,index) in post.recent_replies.slice(0,5)" :key="index" class="clearfix">
                        <router-link :to="{name: 'userInfo',params:{name: topic.author.loginname}}">
                            <a href="#" class="user-avatar"><img :src="topic.author.avatar_url" alt=""></a>       
                        </router-link>   
                        <span class="last-reply">{{topic.last_reply_at | formatDate }}</span>
                        <div class="topic-title-wrapper">
                            <router-link :to = "{name: 'postContent', params: {id: topic.id}}">
                                <span class="title"><a href="#">{{topic.title}}</a></span>
                            </router-link>
                            
                        </div> 
                    </li>
                </ul>
            </section>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'user-info',
    data() {
        return {
            isLoading: false,
            post: {}
        }
    },
    methods: {
        getUserInfo() {
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(ret => {
                this.isLoading = false
                console.log(ret.data.data)
                this.post = ret.data.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    },    
    beforeMount() {
        this.isLoading = true
        this.getUserInfo()
        
    }
    
}
</script>

<style scoped>
  .userInfomation {
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    margin-bottom: 20px;
    border-radius: 3px;
    overflow: hidden;
  }
  .userInfomation img {
    width: 30px;
    vertical-align: top;
    border-radius: 3px;
  }
  .userInfomation li {
    list-style:none;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    line-height: 30px;
  }
  /* .userInfomation li:last-child {
      border-radius: 0 0 3px 3px;
  } */
  .user-details {
    background: white;
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
    padding: 10px;
    line-height: 2em;
    /* border-radius: 0 0 3px 3px; */
  }
  .info-details img {
    width: 40px;
    margin-right: 10px;
  }
  .info-details .author {
    color: #778087;
  }
  .register {
    color: #ababab;
    font-size: 14px;
    padding: 0 0 10px 0;
  }
  .user-topics img {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 20px;
  }
  .user-replies img {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 20px;
  }
  .topic-title-wrapper {
    width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
.no-info {
  padding: 10px;
  background-color: #fff;
}
 
</style>


