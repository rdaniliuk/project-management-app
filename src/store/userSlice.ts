import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USERS_URL } from './apiUrls';
import { IUser } from './usersSlice';

interface IUserState extends IUserResp {
  isLoading: boolean;
}

const initialUserState: IUserState = {
  _id: '',
  name: '',
  login: '',
  statusCode: '',
  errMsg: '',
  isLoading: false,
};

export interface IUserResp extends IUser {
  statusCode: string;
  errMsg: string;
}

export interface IUserReq {
  token: string;
  id: string;
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

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUser() {
      return initialUserState;
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
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
