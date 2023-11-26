import { io } from 'socket.io-client';

const socket = io('http://localhost:3500'); // Connect to the Socket.IO server on port 3500

export default socket;
