# socket.io
Socket.IO 是一个WebSocket库，可以在客户端和服务器之间实现 低延迟, 双向 和 基于事件的 通信。
![image](https://user-images.githubusercontent.com/47767116/223059252-6fc3a12c-6192-4338-84b3-3d87e337f650.png)

会自动根据浏览器从WebSocket、AJAX长轮询、Iframe流等等各种方式中选择最佳的方式来实现网络实时应用; 说白了就是如果浏览器支持websocket，那么socket.io就等同于websocket。当然 socket.io还用到了其它的技术来模拟websocket，例如 HTTP 长轮询。所以当你使用socket.io的时候，不管浏览器是否支持websocket，你都可以实现异步操作。
