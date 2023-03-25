import { io } from 'socket.io-client';
import store from '../slices';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel, renameChannel, removeChannel,
} from '../slices/channelsSlice';

const socket = io();
const { dispatch } = store;

socket.on('newMessage', (message) => {
  dispatch(addMessage(message));
});

socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload));
});

socket.on('renameChannel', (payload) => {
  const { id, name } = payload;
  dispatch(renameChannel({ id, changes: { name } }));
});

socket.on('removeChannel', (payload) => {
  dispatch(removeChannel(payload));
});

export default socket;
