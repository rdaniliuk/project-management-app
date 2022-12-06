import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModals {
  isDeleteShown: boolean;
  id: string;
  modalType?: string;
  isCreateShown: boolean;
  isUserProfileShown: boolean;
  isInfoShown: boolean;
  title: string;
  description: string;
  modalId?: string;
}

const initialModals: IModals = {
  isDeleteShown: false,
  id: '',
  modalType: '',
  modalId: undefined,
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
      state.modalType = action.payload.type;
    },
    hideDeleteModal(state) {
      state.isDeleteShown = false;
      state.id = '';
      state.modalType = '';
    },
    showCreateModal(state, action: PayloadAction<{ modalType: string; modalId?: string }>) {
      state.isCreateShown = true;
      state.modalType = action.payload.modalType;

      if (action.payload.modalId) {
        state.modalId = action.payload.modalId;
      }
    },
    hideCreateModal(state) {
      state.isCreateShown = false;
      state.modalType = undefined;
      state.modalId = undefined;
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
