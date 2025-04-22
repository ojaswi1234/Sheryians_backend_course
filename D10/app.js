const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');

const chess = new Chess();
let players = {};
let currentPlayer = 'w';

const server = http.createServer(app);
const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (uniqueSocket) => {
    console.log('connected');

    if (!players.white) {
        players.white = uniqueSocket.id;
        uniqueSocket.emit('playerRole', 'w');
    } else if (!players.black) {
        players.black = uniqueSocket.id;
        uniqueSocket.emit('playerRole', 'b');
    } else {
        uniqueSocket.emit('spectator');
    }

    uniqueSocket.on('disconnect', () => {
        if (uniqueSocket.id === players.white) {
            players.white = null;
        } else if (uniqueSocket.id === players.black) {
            players.black = null;
        } else {
            console.log('Spectator disconnected');
        }
    });

    uniqueSocket.on('move', (move) => {
        try {
            if (chess.turn() === 'w' && uniqueSocket.id !== players.white) return;
            if (chess.turn() === 'b' && uniqueSocket.id !== players.black) return;

            const result = chess.move(move);
            if (result) {
                currentPlayer = chess.turn();
                io.emit('move', move);
                io.emit('boardState', chess.fen());
            } else {
                console.log('Invalid move:', move);
                uniqueSocket.emit('invalidMove', move);
            }
        } catch (e) {
            console.log('Error processing move:', e.message);
            uniqueSocket.emit('invalidMove', move);
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000 \n http://localhost:3000');
});