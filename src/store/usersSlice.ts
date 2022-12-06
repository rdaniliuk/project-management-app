import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USERS_URL } from './apiUrls';

export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IUsers {
  all: IUser[];
  isLoading: boolean;
  statusCode: string;
  errMsg: string;
}

const initialUsers: IUsers = {
  all: [],
  isLoading: false,
  statusCode: '',
  errMsg: '',
};

export interface IGetUsersResp {
  users: IUser[];
  statusCode: string;
  message: string;
}

export const getUsers = createAsyncThunk<IGetUsersResp, string>(
  'users/getUsers',
  async function (token) {
    const getUsersResp: IGetUsersResp = {
      users: [],
      statusCode: '',
      message: '',
    };

    try {
      const resp = await fetch(`${USERS_URL}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as IGetUsersResp;

      if (Array.isArray(data)) {
        getUsersResp.users = data;
      } else {
        Object.assign(getUsersResp, data);
      }
    } catch (e: unknown) {
      getUsersResp.statusCode = '1';
      getUsersResp.message = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return getUsersResp;
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (users) => {
        users.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (users, action) => {
        const { users: allUsers, statusCode, message } = action.payload;
        users.all = allUsers;
        users.errMsg = message;
        users.statusCode = statusCode;
        users.isLoading = false;
      });
  },
});

export default usersSlice.reducer;
