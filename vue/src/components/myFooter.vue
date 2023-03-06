<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" @keyup.enter.native="send"> </el-input>
  </div>
</template>

<script>
import store from '../store/index'
export default {
  data() {
    return {
      input:'',
    }
  },
  methods: {
    send(){
      var time = new Date();
      /* 发送消息 */
      let data={
        senderName:this.myInfo.name,//发送者id
        senderimg:this.myInfo.img,//发送者的img
        time:time.toLocaleString(),//发送时间
        msg: this.input,//消息内容
        room: this.room
      }
      /* 自己的信息直接push到数组中 */
      // store.commit('SOCKET_updateChatMessageList',data);
      this.$socket.emit('groupChat',data);
      /* 清空输入框 */
      this.input='';
    },
  },
  computed:{
    myInfo(){
      return store.state.myInfo;
    },
    room(){
      return store.state.room;
    },
  },
};
</script>

<style>
</style>