<template>
    <div class="login">
        <div class="login-frame">
            <div class="info-header">
                <router-link to="/">
                  <a href="#"><span>主页 /</span></a> 
                 </router-link>
                 登陆
            </div>
            <div class="info-details">
                <div class="access clearfix">
                    请输入Access Token
                    <input type="text" v-model="accessToken">
                     <p class="button" @click = "check(accessToken)" >登陆</p>
                </div>
            </div>
            <div class="tips">
                <ul>
                    <li>为了更好的体验请登录</li>
                    <li>输入CNode账号的Access Token</li>
                    <li>在个人中心可以获取Access Token</li>
                    <li>调用的是官方API,请放心使用~</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
            accessToken: window.sessionStorage.access_token || ''
        }
    },
    methods: {
        check(ak){
            if(!ak) {
                return this.$message({
                    message:'Access Token不能为空',
                    type: 'warning',
                    center: true
                })
            }
            this.$http.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: ak})
            .then(ret => {
                console.log(ret)
                if(ret.data.success){
                    this.$store.dispatch('login',{
                        accessToken: ak,
                        userInfo: ret.data
                    })
                    this.$message({
                        message: '已成功登陆！',
                        type: 'success',
                        center: true
                    })
                    this.$router.replace('/')
                }
            })
            .catch(err => {
                console.log(err)
                this.$message({
                    message:'Access Token错误',
                    type: 'warning',
                    center: true
                })
            })
        }
    }
}
</script>

<style scoped>
.login-frame {
    margin: 10px auto;
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.info-header {
    width: 100%;
    padding: 10px;
    background-color: #f6f6f6;
    border-top: 1px solid #f0f0f0;
    font-size: 16px;
    letter-spacing: 1px;
}
.info-header a {
    color: #80bd01;
}
.info-details {
    width: 100%;
    padding: 30px;
    line-height: 2em;
    background-color: #fff;
    text-align: center;
}
.access {
    display: inline-block;
}
.access input {
    margin-left: 10px;
    border-radius: 5px;
    padding: 4px 20px;
    border: 1px solid #aaa;
}
.button {
    margin-left: 50px;
    background-color: #80bd01;
    border: 1px solid #80bd01;
    color: #fff;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    padding: 0 2px;
    width: 60px;
    height: 29px;
    margin: 20px 0;
    font-size: 14px;
    letter-spacing: 3px;
}
.button:hover {
    background-color: #7db405;
}
.tips {
    flex: 2;
    margin: 30px 0;
    line-height: 2em;
}
    

</style>


