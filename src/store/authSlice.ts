import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';
import { AUTH_URL } from './apiUrls';

export interface IAuth {
  id: string;
  token: string;
  isLogged: boolean;
  isLoading: boolean;
  statusCode: string;
  errMsg: string;
}

const initialAuth: IAuth = {
  id: '',
  token: '',
  isLogged: false,
  isLoading: false,
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

export interface ISignUpOpt {
  name: string;
  login: string;
  password: string;
}

export interface ISignUpResp {
  name: string;
  login: string;
  _id: string;
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

export const signUp = createAsyncThunk<ISignUpResp, ISignUpOpt>(
  'auth/signUp',
  async function (opt) {
    const signUpResp: ISignUpResp = {
      _id: '',
      name: '',
      login: '',
      statusCode: '',
      message: '',
    };

    try {
      const resp = await fetch(`${AUTH_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opt),
      });

      const data = (await resp.json()) as ISignInResp;
      Object.assign(signUpResp, data);
    } catch (e) {
      signUpResp.statusCode = '1';
      signUpResp.message = 'Connection error';
    } finally {
      return signUpResp;
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
        auth.errMsg = '';
        auth.statusCode = '';
        auth.isLogged = false;
        auth.isLoading = true;
      })
      .addCase(signIn.fulfilled, (auth, action) => {
        const { token, statusCode, message } = action.payload;
        const decodedToken = decodeToken<IToken>(token);

        if (decodedToken) {
          auth.token = token;
          auth.id = decodedToken.id;
        }
        auth.errMsg = message;
        auth.statusCode = statusCode;
        auth.isLoading = false;
        auth.isLogged = !!token;
      })
      .addCase(signUp.pending, (auth) => {
        auth.id = '';
        auth.token = '';
        auth.isLogged = false;
        auth.isLoading = true;
      })
      .addCase(signUp.fulfilled, (auth, action) => {
        const { _id, statusCode, message } = action.payload;

        auth.id = _id;
        auth.errMsg = message;
        auth.statusCode = statusCode;
        auth.isLoading = false;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
