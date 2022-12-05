import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModals {
  isDeleteShown: boolean;
  id: string;
  type: string;
  isCreateShown: boolean;
  isUserProfileShown: boolean;
  isInfoShown: boolean;
  title: string;
  description: string;
}

const initialModals: IModals = {
  isDeleteShown: false,
  id: '',
  type: '',
  isCreateShown: false,
  isUserProfileShown: false,
  isInfoShown: false,
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
    showDeleteModal(state, action: PayloadAction<{ id: string; type: string }>) {
      state.isDeleteShown = true;
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
    hideDeleteModal(state) {
      state.isDeleteShown = false;
      state.id = '';
      state.type = '';
    },
    showCreateModal(state) {
      state.isCreateShown = true;
    },
    hideCreateModal(state) {
      state.isCreateShown = false;
    },
    showUserProfileModal(state) {
      state.isUserProfileShown = true;
    },
    hideUserProfileModal(state) {
      state.isUserProfileShown = false;
    },
    showInfoModal(state, action: PayloadAction<{ title: string; description: string }>) {
      state.isInfoShown = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    hideInfoModal(state) {
      state.isInfoShown = false;
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
  showUserProfileModal,
  hideUserProfileModal,
  showInfoModal,
  hideInfoModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;
