<template>
<div class="message">
    <section>
        <div class="info-header">
            <router-link to="/">
            <a href="#"><span>主页</span></a> 
            </router-link>   
            / 新消息
        </div>
        <div class="info-details">
            <div v-if='notReadMessage.length === 0'>无消息</div>
            <Msg v-else :readMessages = 'notReadMessage'/>

        </div>

    </section>
    <section>
        <div class="info-header">
            过往信息  
        </div>
        <div class="info-details">
            <div v-if='hasReadMessage.length === 0'>无消息</div>
            <Msg v-else :readMessages = 'hasReadMessage'/>
        </div>

    </section>
</div>
    
</template>
<script>
import Msg from './Msg';
export default {
    name: 'Message',
    data(){
        return {
            hasReadMessage: [],
            notReadMessage: []

        }
    },
    methods: {
        getMessage(){
            this.$http.get(`https://cnodejs.org/api/v1/messages`,{
            params: {
                accesstoken: this.$route.params.ak
            }})
            .then(ret => {
                console.log(ret.data)
                if(ret.data.success === true){
                    this.hasReadMessage = ret.data.data.has_read_messages,
                    this.notReadMessage = ret.data.data.hasnot_read_messages
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.getMessage()
    }
    
}
</script>
<style scoped>
  .message {
    margin-right: 305px;
  }
  .message section {
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
    padding: 10px;
    line-height: 2em;
    background-color: #fff;
    /* border-radius: 0 0 3px 3px; */
  }


</style>


