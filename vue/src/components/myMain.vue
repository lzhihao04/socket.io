<template>
  <div class="div1">
    <div v-for="(item, index) in msgList" :key="index">
      <div class="isflexR" v-if="myInfo.name==item.senderName">
        <div class="msgText">
          <span style="text-align: right;">{{item.senderName}}</span>
          <span class="content">{{item.msg}}</span>
        </div>
        <el-avatar :src="item.senderimg" style="margin-left: 5px;"></el-avatar>
      </div>
      <div class="isflexl" v-else>
        <el-avatar :src="item.senderimg" style="margin-right: 5px;"></el-avatar>
        <div class="msgText">
          <span style="text-align: left;">{{item.senderName}}</span>
          <span class="content">{{item.msg}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
export default {
  data() {
    return {
    };
  },
  computed:{
    msgList(){
      return store.state.chatMessageList[store.state.room];
    },
    myInfo(){
      return store.state.myInfo;
    },
  },
};
</script>
<style scoped>
.div1 {
  width: 100%;
}
.content{
  background-color: rgb(255, 255, 255);
  padding: 5px;
  border-radius: 5px;
  word-break:break-all;
  white-space: normal;
}
.isflexR{
  display: flex;
  align-items: start;
  justify-content: end;
  margin-top: 10px;
}
.isflexl{
  display: flex;
  align-items: start;
  justify-content: start;
  margin-top: 10px;
}
.msgText{
  display: flex;
  flex-direction: column;
  max-width: 70%;
}
</style>