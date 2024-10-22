const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket, req) => {

    const remoteAddress = req.socket.remoteAddress;

    socket.on('open', () => {
        sendAll(
            JSON.stringify(
                {
                    'type': "connect",
                    'value': remoteAddress
                }
            )
        );
    });

    socket.on('message', msg => {
        sendAll(
            JSON.stringify(
                {
                    'type': "message",
                    'sender': remoteAddress,
                    'value': msg.toString()
                }
            )
        );
    });

    socket.on('close', (code, reason) => {
        sendAll(
            JSON.stringify(
                {
                    'type': "close",
                    'code': code,
                    'reason': reason,
                    'value': remoteAddress
                }
            )
        );
    });

});

function sendAll(msg) {
    server.clients.forEach(
        client => client.send(msg)
    );
}