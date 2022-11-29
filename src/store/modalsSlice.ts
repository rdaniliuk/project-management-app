import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModals {
  isDeleteShown: boolean;
  boardId: string;
  isCreateShown: boolean;
}

const initialModals: IModals = {
  isDeleteShown: false,
  boardId: '',
  isCreateShown: false,
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
    showCreateModal(state) {
      state.isCreateShown = true;
    },
    hideCreateModal(state) {
      state.isCreateShown = false;
    },
  },
});

export const { resetModals, showDeleteModal, hideDeleteModal, showCreateModal, hideCreateModal } =
  modalsSlice.actions;
export default modalsSlice.reducer;
