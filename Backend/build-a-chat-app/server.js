import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        fs.readFile("./public/index.html", (err, data) => {
            if (err) {
                res.writeHead(500, { "content-type": "text/json" });
                res.end(JSON.stringify({
                    message: "Error!"
                }))

                return
            }

            res.writeHead(200, { "content-type": "text/html" })
            res.end(data)
        })
    }

    else if (req.url == "/script.js") {
        fs.readFile("./public/script.js", (err, data) => {
            if (err) {
                res.writeHead(500, { "content-type": "text/json" });
                res.end(JSON.stringify({
                    message: "Error!"
                }))

                return
            }

            res.writeHead(200, { "content-type": "application/javascript" })
            res.end(data)
        })
    }

})

const wss = new WebSocketServer({ server })

wss.on("connection", (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get(
        "username");

    wss.clients.forEach(client => {
        if (client.readyState == WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "system",
                text: `${username} joined`
            }))
        }
    });



    socket.on("message", (data) => {
        const { username, text } = JSON.parse(data.toString());

        wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'chat',
                    username,
                    text
                }))
            }
        })
    })

    socket.on("close", () => {
        wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: "system",
                    text: `${username} left`
                }))
            }
        });
    })
})

server.listen(PORT)