import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsSlice";

const adapter = createEntityAdapter();

const messageSlice = createSlice({
  name: "messages",
  initialState: adapter.getInitialState(),
  reducers: {
    addMessages: adapter.addMany,
    addMessage: adapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload.id;
      const newMessages = Object.values(state.entities).filter(
        (message) => message.channelId !== channelId
      );
      adapter.setAll(state, newMessages);
    });
  },
});
export default messageSlice.reducer;
export const { addMessages, addMessage } = messageSlice.actions;
export const selectors = adapter.getSelectors((state) => state.messages);
