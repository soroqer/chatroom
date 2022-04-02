# chatroom

端口：8585

# 1 接口数据格式

```ecmascript 6
const socket = io("ws://localhost:8585",{
    auth: {
        address:"0x87A4..."
    }
});

// 发送聊天信息
socket.emit('chat message', {"sender":"0x87A4...","content":"发言内容..."});

// 接收聊天信息
socket.on('chat message', function(msg) {
    let sender = msg.sender;    // 信息发送者
    let content = msg.content;  // 信息内容
});

// 接收系统提示
socket.on('system message', function(msg) {
    let code = msg.code;        // code, 1：黑名单；2：发言频繁，发送失败； 3：敏感词汇
    let content = msg.content;  // 文字说明
});    

```

# 2 部署、启动

```shell
// 下载代码
git clone https://github.com/soroqer/chatroom.git

// 进入根目录
cd chatroom

// 安装依赖
npm i

// 使用pm2启动
pm2 start index.js
```