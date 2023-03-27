/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    activeChannel: 1,
    selectedChannel: null,
  }),
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
    selectChannel(state, { payload }) {
      state.selectedChannel = payload;
    },
  },
});

export default channelSlice.reducer;
export const {
  addChannels, addChannel, renameChannel, removeChannel, setActiveChannel, selectChannel,
} = channelSlice.actions;
export const channelSelector = channelsAdapter.getSelectors((state) => state.channels);
export const channelControlSelector = {
  selectActive: (state) => state.channels.activeChannel,
  selectChannel: (state) => state.channels.selectedChannel,
};
