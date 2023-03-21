import { configureStore } from '@reduxjs/toolkit';
import channelReducer from './channelsSlice';
import messageReducer from './messagesSlice';
import activeChannelReducer from './activeChannelSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    channels: channelReducer,
    channel: activeChannelReducer,
    messages: messageReducer,
    modal: modalReducer,
  },
});
