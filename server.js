// server.js
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);
    // ส่งข้อความให้ทุกคน
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server running on port ${PORT}`);
