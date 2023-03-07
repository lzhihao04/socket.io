import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* 记录登录状态 */
        isLogin:false,
        /* 我的信息 */
        myInfo:{
            img:'',
            name:'',
        },
        /* 用户列表 */
        userList:{},
        /* 聊天记录 */
        chatMessageList:{
            0:[],
            1:[],
            2:[],
        },
        room: 0
    },
    mutations: {
        /* 聊天记录的修改,这里我们使用vuex监听 */
        SOCKET_updateChatMessageList(state,data){
            state.chatMessageList[data.room].push(data);
        },
        /* 渲染用户列表 */
        SOCKET_login(state,data){
            state.userList=data;
        },
        setMyInfo(state,data){
            state.myInfo=data;
            state.isLogin=true;
        },
        setRoom(state,data){
            state.room = data;
        },
        SOCKET_room(state,data){
            console.log('room:',state,data)
        },
    },
    actions: {},
    modules: {}
})
