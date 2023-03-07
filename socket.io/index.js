var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
    allowEIO3: true,
    cors: {
        origin: "http://localhost:8080",
        credentials: true
    }
});
/* 接收在线人数，传给前端，保证在线人数是最新的 */
var userList={
    0:[],
    1:[],
    2:[],
};

//多路复用
// io.of('/test').on('connection', function (socket) {
//     console.log('socket111',userList)
//     socket.on("login", (data,callback) => {
//         console.log('成功连接test线路')
//         callback('成功连接test线路')
//     });
// });

// 中间件
io.use((socket, next) => {
    next();
});

io.on('connection', function (socket) {
    /* 监听用户登录事件,并将数据放到socket实例的属性上 */
    socket.on('login',(data,callback)=>{
        /* 遍历服务器连接对象 */
        var islogin=true;
        io.sockets.sockets.forEach(iss => {
            if(iss.name==data.name){
                islogin=false;
            }
        });
        if(islogin){
            socket.name=data.name;
            callback(true);
        }else{
            console.log('用户登录失败！：',data);
            callback(false);
        }
    });

    /* 监听群聊事件 */
    socket.on('groupChat',data=>{
        // 发送到某个房间（群聊）包括发送者，socket.to不包括发送者
        io.to(`room${data.room}`).emit('updateChatMessageList',data);
        // 发送给所有客户端，除了发送者
        // socket.broadcast.emit('updateChatMessageList',data);
        // 发送给所有客户端，包括发送者
        // io.volatile.emit('updateChatMessageList',data);
    });
    // 进入群聊房间
    socket.on('room',data=>{
        console.log('data',data)
        socket.join(`room${data.room}`);
        let index=userList[data.room].findIndex(i=>i.name==socket.name);
        if(index==-1){
            userList[data.room].push(data)
            io.emit('login',userList);
        }
    });
    /* 监听私聊事件 */
    // socket.on('privateChat',data=>{
    //     io.sockets.sockets.forEach(iss=>{
    //         if(iss.name==data.receiver){
    //             data.type='user';
    //             io.to(iss.id).emit('updateChatMessageList',data);
    //         }
    //     });
    // });

    /* 用户掉线 */
    socket.on('disconnect',()=>{
        /* 删除用户 */
        Object.keys(userList).map((item)=>{
            let index=userList[item].findIndex(i=>i.name==socket.name);
            if(index!=-1){
                userList[item].splice(index,1);
                /* 通知客户端 */
                io.emit('login',userList);
            }
        })
       
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
