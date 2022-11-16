import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';
import { AUTH_URL } from './apiUrls';

export interface IAuth {
  id: string;
  token: string;
  isLogged: boolean;
  isLogging: boolean;
  statusCode: string;
  errMsg: string;
}

const initialAuth: IAuth = {
  id: '',
  token: '',
  isLogged: false,
  isLogging: false,
  statusCode: '',
  errMsg: '',
};

export interface ISignInOpt {
  login: string;
  password: string;
}

export interface ISignInResp {
  token: string;
  statusCode: string;
  message: string;
}

interface IToken {
  id: string;
  login: string;
  iat: string;
  exp: string;
}

export const signIn = createAsyncThunk<ISignInResp, ISignInOpt>(
  'auth/signIn',
  async function (opt) {
    const signInResp: ISignInResp = {
      token: '',
      statusCode: '',
      message: '',
    };

    try {
      const resp = await fetch(`${AUTH_URL}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opt),
      });

      const data = (await resp.json()) as ISignInResp;
      Object.assign(signInResp, data);
    } catch (e) {
      signInResp.statusCode = '1';
      signInResp.message = 'Connection error';
    } finally {
      return signInResp;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuth,
  reducers: {
    resetAuth() {
      return initialAuth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (auth) => {
        auth.id = '';
        auth.token = '';
        auth.isLogged = false;
        auth.isLogging = true;
      })
      .addCase(signIn.fulfilled, (auth, action) => {
        const { token, statusCode, message } = action.payload;
        const decodetToken = decodeToken<IToken>(token);

        if (decodetToken) {
          auth.token = token;
          auth.id = decodetToken.id;
        }
        auth.errMsg = message;
        auth.statusCode = statusCode;
        auth.isLogging = false;
        auth.isLogged = !!token;
      });
  },
});

export default authSlice.reducer;
