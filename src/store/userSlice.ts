import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USERS_URL } from './apiUrls';
import { IUser } from './usersSlice';

interface IUserState extends IUserResp {
  isLoading: boolean;
  isSuccessful: boolean;
  isDeleted: boolean;
}

const initialUserState: IUserState = {
  _id: '',
  name: '',
  login: '',
  statusCode: '',
  errMsg: '',
  isLoading: false,
  isSuccessful: false,
  isDeleted: false,
};

export interface IUserResp extends IUser {
  statusCode: string;
  errMsg: string;
}

export interface IUserReq {
  token: string;
  id: string;
}

export interface IPutUserReq extends IUserReq {
  user: Omit<IUser, '_id'>;
}

export const getUser = createAsyncThunk<IUserResp, IUserReq>(
  'user/getUser',
  async function ({ token, id }) {
    const userResp: IUserResp = {
      _id: '',
      name: '',
      login: '',
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${USERS_URL}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as IUserResp;

      Object.assign(userResp, data);
    } catch (e: unknown) {
      userResp.statusCode = '1';
      userResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return userResp;
    }
  }
);

export const putUser = createAsyncThunk<IUserResp, IPutUserReq>(
  'user/putUser',
  async function ({ token, id, user }) {
    const userResp: IUserResp = {
      _id: '',
      name: '',
      login: '',
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${USERS_URL}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.name, login: user.login, password: '' }),
      });

      const data = (await resp.json()) as IUserResp;

      Object.assign(userResp, data);
    } catch (e: unknown) {
      userResp.statusCode = '1';
      userResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return userResp;
    }
  }
);

export const deleteUser = createAsyncThunk<IUserResp, IUserReq>(
  'user/deleteUser',
  async function ({ token, id }) {
    const userResp: IUserResp = {
      _id: '',
      name: '',
      login: '',
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${USERS_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as IUserResp;

      Object.assign(userResp, data);
    } catch (e: unknown) {
      userResp.statusCode = '1';
      userResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return userResp;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUser() {
      return initialUserState;
    },
    clearUserError(user) {
      user.statusCode = '';
      user.errMsg = '';
    },
    clearIsSuccessful(user) {
      user.isSuccessful = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (users) => {
        users.isLoading = true;
      })
      .addCase(getUser.fulfilled, (user, action) => {
        const resp = action.payload;
        Object.assign(user, resp);
        user.isLoading = false;
      })
      .addCase(putUser.pending, (users) => {
        users.isLoading = true;
      })
      .addCase(putUser.fulfilled, (user, action) => {
        const resp = action.payload;
        Object.assign(user, resp);
        user.isLoading = false;
        user.isSuccessful = !resp.statusCode;
      })
      .addCase(deleteUser.pending, (users) => {
        users.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (user, action) => {
        const resp = action.payload;
        Object.assign(user, resp);
        user.isLoading = false;
        user.isDeleted = !resp.statusCode;
      });
  },
});

export const { resetUser, clearUserError, clearIsSuccessful } = userSlice.actions;
export default userSlice.reducer;
