import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModals {
  isDeleteShown: boolean;
  boardId: string;
}

const initialModals: IModals = {
  isDeleteShown: false,
  boardId: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState: initialModals,
  reducers: {
    resetModals() {
      return initialModals;
    },
    showDeleteModal(state, action: PayloadAction<string>) {
      state.isDeleteShown = true;
      state.boardId = action.payload;
    },
    hideDeleteModal(state) {
      state.isDeleteShown = false;
      state.boardId = '';
    },
  },
});

export const { resetModals, showDeleteModal, hideDeleteModal } = modalsSlice.actions;
export default modalsSlice.reducer;
