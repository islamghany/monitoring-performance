import express from 'express';
import * as socketio from 'socket.io';
import cors from 'cors'
const port = 8181;
import helmet from 'helmet'
import socketMain from './socket.js';

let app = express();
app.use(cors());
app.use(helmet());

const server = app.listen(port,()=>console.log('Server is Running on port: '+port));

const io = new socketio.Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    }
});
io.on('connection', function(socket) {
socketMain(io,socket);
console.log(`connected to worker`);
});
