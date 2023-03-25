/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { item: null, type: null },
  reducers: {
    renderModal(state, { payload }) {
      const { action, item } = payload;
      state.item = item;
      state.type = action;
    },
    onClose(state) {
      state.item = null;
      state.type = null;
    },
  },

});

export default modalSlice.reducer;
export const modalDataSelector = ((state) => state.modal);
export const {
  renderModal, onClose,
} = modalSlice.actions;
