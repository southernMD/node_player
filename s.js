import { Server } from 'ws';

// 创建 WebSocket 服务器
const wss = new Server({ port: 8080 });

// 保存连接的客户端
const clients = new Set();

// WebSocket 服务器的连接事件处理程序
wss.on('connection', function connection(ws) {
  console.log('新的 WebSocket 连接已建立');

  // 将新连接的客户端保存到集合中
  clients.add(ws);

  ws.on('message', function incoming(message) {
    console.log('收到消息:', message);

    // 处理收到的消息

    // 向所有客户端广播消息
    broadcast(message);
  });

  ws.on('close', function close() {
    console.log('WebSocket 连接已关闭');

    // 从集合中移除关闭的客户端
    clients.delete(ws);
  });
});
