import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import boardsReducer from './boardsSlice';
import modalsSlice from './modalsSlice';
import usersReducer from './usersSlice';
import boardReducer from './boardSlice';
import columnsReducer from './columnsSlice';
import userSlice from './userSlice';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    boards: boardsReducer,
    board: boardReducer,
    columns: columnsReducer,
    modals: modalsSlice,
    user: userSlice,
    tasks: tasksReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
