import { createSlice } from '@reduxjs/toolkit';

const activeChannelSlice = createSlice({
  name: 'active channel',
  initialState: { activeChannel: 1, selectedChannel: null },
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
export const {
  setActiveChannel, selectChannel,
} = activeChannelSlice.actions;
