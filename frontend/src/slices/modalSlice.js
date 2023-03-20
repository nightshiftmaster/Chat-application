/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, action: 'adding' },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.action = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },

});

export default modalSlice.reducer;
export const {
  openModal, closeModal,
} = modalSlice.actions;