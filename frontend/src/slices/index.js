import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice';
import messageReducer from './messagesSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    messages: messageReducer,
    modal: modalReducer,
  },
});
