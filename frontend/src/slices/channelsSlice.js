import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const adapter = createEntityAdapter();

const channelSlice = createSlice({
  name: "channels",
  initialState: adapter.getInitialState({}),
  reducers: {
    addChannels: adapter.addMany,
    addChannel: adapter.addOne,
  },
});

export default channelSlice.reducer;
export const { addChannels, addChannel } = channelSlice.actions;
export const selectors = adapter.getSelectors((state) => state.channels);
