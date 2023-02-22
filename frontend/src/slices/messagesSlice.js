import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const adapter = createEntityAdapter();

const messageSlice = createSlice({
  name: "messages",
  initialState: adapter.getInitialState(),
  reducers: {
    addMessages: adapter.addMany,
    addMessage: adapter.addOne,
  },
});

export default messageSlice.reducer;
export const { addMessages, addMessage } = messageSlice.actions;
export const selectors = adapter.getSelectors((state) => state.messages);
