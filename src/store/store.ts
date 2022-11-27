import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import boardsReducer from './boardsSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    boards: boardsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
