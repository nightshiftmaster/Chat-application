import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeChannel: 1, selectedChannel: null };

const activeChannelSlice = createSlice({
  name: 'active channel',
  initialState,
  reducers: {
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

export default activeChannelSlice.reducer;

export const channelsSelectors = {
  selectActive: (state) => state.channel.activeChannel,
  selectChannel: (state) => state.channel.selectedChannel,
};

export const {
  setActiveChannel, selectChannel,
} = activeChannelSlice.actions;
