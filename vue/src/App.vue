<template>
  <div class="common">
    <!-- 登录 -->
    <div v-if="!isLogin" class="login">
      <el-tabs v-model="activeName">
        <el-tab-pane label="欢迎登录" name="first">
          <!-- 用户名输入 -->
            <el-input size="mini" v-model="username" placeholder="请输入用户名">
              <el-button slot="append" @click="login">登录</el-button>
            </el-input>
            <!-- 头像选择 -->
            <div class="avatar">
              <span @click="avatar(src)" v-for="(src,index) in avatarList" :key="index">
                <el-avatar :src="src" :class="{'choosed':src==choosed}"></el-avatar>
              </span>
            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 聊天 -->
    <el-container v-else>
      <el-header style="background: #fff;"> 
        <div class="roomTab">
          <span @click="changeRoom(0)">高级人员会议</span>
          <span @click="changeRoom(1)">群聊1</span>
          <span @click="changeRoom(2)">群聊2</span>
        </div>
      </el-header>
      <el-container>
        <el-container>
          <el-header> 
            <span>{{roomName}}</span>
          </el-header>
          <el-main>
            <my-main />
          </el-main>
          <el-footer>
            <my-footer />
          </el-footer>
        </el-container>
        <el-aside width="50px">
          <div style="padding: 5px 0;" v-for="item in userList" :key="item.name">
            <el-avatar :src="item.img"></el-avatar>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from './store/index'
import myMain from "./components/myMain.vue";
import myFooter from "./components/myFooter.vue";
export default {
  name: "App",
  components: { myMain, myFooter },
  data() {
    return {
      activeName:'first',
      username:'',
      choosed:'',
      roomName: '高级人员会议',
      avatarList:[
        'http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg',
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        'http://5b0988e595225.cdn.sohucs.com/images/20180312/366885f17a20469587cac376c0102527.jpeg',
        'http://img.52z.com/upload/news/image/20180111/20180111085521_86389.jpg',
        'https://pic.qqtn.com/up/2019-1/2019010208201525732.jpg',
        'http://img.zcool.cn/community/010e9557f74cbba84a0d304faa657c.jpg',
        'http://img.zcool.cn/community/01a7f7590cd5a3a8012145509a8335.jpg@2o.jpg',
        'http://5b0988e595225.cdn.sohucs.com/images/20180526/60a21af360d2457c950295839bea8feb.jpeg'
      ],
    }
  },
  methods: {
    avatar(src){
      this.choosed=src
    },
    login(){
      if(this.username&&this.choosed){
        this.$socket.connect();
        this.$socket.on("connect", () => {
          if(this.$socket.connected){
            this.$socket.emit('login',{name:this.username,img:this.choosed},(result)=>{
              if(result){
                store.commit('setMyInfo',{
                  img:this.choosed,
                  name:this.username,
                });
                this.changeRoom(0)//加入默认群聊
              }else{
                this.$message.error('用户名重复！');
              }
            });
          }
        });
        
      }
    },
    changeRoom(room){
      const type = {
        0: '高级人员会议',
        1: '群聊1',
        2: '群聊2',
      }
      this.roomName = type[room];
      this.$socket.emit('room',room);
      store.commit('setRoom',room);
    }
  },
  computed:{
    isLogin(){
      return store.state.isLogin;
    },
    userList(){
      return store.state.userList;
    },
    myInfo(){
      return store.state.myInfo;
    },
  },
};
</script>
<style scoped>
html,body,#app{
  height: 100%;
  display: flex;
}
.choosed{
  border:  solid 2px red;
}
.login{
  width: 50%;
  margin: auto;
  border: solid 1px rgb(228, 231, 237);
  border-radius: 10px;
  background: #b6cbef;
  padding: 30px;
}
.login .avatar{
  margin-top: 20px;
}
.login .avatar .el-avatar{
  cursor: pointer;
  margin-left: 5px;
}
.common {
  /* padding: 100px; */
  margin-top: 100px;
  /* width: 800px; */ /* 800 是我为了演示3个用户同时在线，建议设为100%，项目的宽度直接受这个影响*/
  width:100%;
  height: 200px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 500px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 280px;
  padding: 8px;
}

body > .el-container {
  margin-bottom: 40px;
}
.roomTab{
  width: 100%;
  height: 100%;
}
.roomTab span{
  margin: 10px;
}
</style>
