import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../store/apiUrls';
import { IColumn } from './boardSlice';

export interface IBoard {
  isLoading: boolean;
  boardId: string;
  title: string;
  description: string;
  statusCode: string;
  errMsg: string;
}

export interface IBoards {
  boards: IBoard[];
  isLoading: boolean;
  statusCode: string;
  errMsg: string;
}

const initialBoards: IBoards = {
  boards: [],
  isLoading: false,
  statusCode: '',
  errMsg: '',
};

export interface IGetBoardsResp {
  boards: IBoard[];
  statusCode: string;
  errMsg: string;
}

export const getBoards = createAsyncThunk<IGetBoardsResp, string>(
  'boards/getBoards',
  async function (token: string) {
    const getBoardsResp: IGetBoardsResp = {
      boards: [],
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as IBoards;

      if (Array.isArray(data)) {
        getBoardsResp.boards = data;
      } else {
        Object.assign(getBoardsResp, data);
      }
    } catch (e: unknown) {
      getBoardsResp.statusCode = '1';
      getBoardsResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return getBoardsResp;
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialBoards,
  reducers: {
    resetBoards() {
      return initialBoards;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (boards) => {
        boards.isLoading = true;
      })
      .addCase(getBoards.fulfilled, (boards, action) => {
        const { boards: allBoards, statusCode, errMsg } = action.payload;
        boards.boards = allBoards;
        boards.errMsg = errMsg;
        boards.statusCode = statusCode;
        boards.isLoading = false;
      });
  },
});

export const { resetBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
