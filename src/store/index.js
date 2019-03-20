import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        accessToken: window.sessionStorage.access_token || '',
        isLogin: false,
        userInfo: {},
        messageCount: 0 //未读消息数
    },
    mutations: {
        //退出登陆
        logout(state){
            window.sessionStorage.removeItem('access_token')
            state.accessToken = ''
            state.isLogin = false
        },
        //更新登陆状态
        updateLoginStatus(state,data){
            
            if(data.accessToken){
                window.sessionStorage.access_token = data.accessToken
                state.accessToken = window.sessionStorage.access_token
                state.userInfo = data.userInfo
            }else{
                state.userInfo = data //????
            }
            state.isLogin = true
            console.log(state)
        },
        //更新未读消息数
        updateMessageCount(state,count){
            state.messageCount = count
        }
    },
    actions: {
        //登陆
        login({dispatch,commit},data){
            commit('updateLoginStatus',data)
            dispatch('fetchMessageCount')
        },
        //检查是否已登陆
        checkLogin({dispatch,commit}){
            if(this.state.accessToken){
                axios.post('https://cnodejs.org/api/v1/accesstoken', {
                    accesstoken: this.state.accessToken
                    })
                    .then(ret => {
                    if (ret.data.success === true) {
                        commit('updateLoginStatus', ret.data)
                        dispatch('fetchMessageCount')
                    }
                    })
                    .catch(err => {
                    console.log(err)
                    })

            }
        },
        //获取未读消息数
        fetchMessageCount({commit}){
            if(this.state.accessToken){
                axios.get('https://cnodejs.org/api/v1/message/count', {
                    params: {
                        accesstoken: this.state.accessToken
                    }
                    })
                    .then(ret => {
                    if (ret.data.success) {
                        console.log(ret)
                        commit('updateMessageCount', ret.data.data)
                    }
                    })
                    .catch(err => {
                    console.log(err)
                    })

            }

        }

    }
})

export default store