import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter({});
const channelControl = { activeChannel: 1, selectedChannel: null };
const adapter = channelsAdapter.getInitialState();

const channelSlice = createSlice({
  name: 'channels',
  initialState: { ...adapter, ...channelControl },
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    setActiveChannel(state, { payload }) {
      const activeChannel = { ...state.activeChannel, ...payload };
      return { ...state, activeChannel };
    },
    selectChannel(state, { payload }) {
      const selectedChannel = { ...state.selectedChannel, ...payload };
      return { ...state, selectedChannel };
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
