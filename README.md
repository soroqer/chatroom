# chatroom

端口：8585

# 1 接口数据格式

```ecmascript 6
    var socket = io();

    // 发送聊天信息
    socket.emit('chat message', {"sender":"0x87A4...","content":"发言内容..."});
    
    // 接收聊天信息
    socket.on('chat message', function(msg) {
        let sender = msg.sender;    // 信息发送者
        let content = msg.content;  // 信息内容
    });
    
    // 接收系统提示
    socket.on('system message', function(msg) {
        let code = msg.code;        // code, 2: 发言频繁，发送失败
        let content = msg.content;  // 文字说明
    });

```

# 2 部署、启动

```shell
    node index.js
```