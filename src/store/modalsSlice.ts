import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModals {
  isDeleteShown: boolean;
  boardId: string;
  isCreateShown: boolean;
  title: string;
  description: string;
}

const initialModals: IModals = {
  isDeleteShown: false,
  boardId: '',
  isCreateShown: false,
  title: '',
  description: '',
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
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    resetValues(state) {
      state.title = '';
      state.description = '';
    },
  },
});

export const {
  resetModals,
  showDeleteModal,
  hideDeleteModal,
  showCreateModal,
  hideCreateModal,
  setTitle,
  setDescription,
  resetValues,
} = modalsSlice.actions;
export default modalsSlice.reducer;
