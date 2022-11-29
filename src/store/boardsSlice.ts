import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../store/apiUrls';

export interface IBoard {
  isLoading: boolean;
  _id: string;
  title: string;
  description: string;
  statusCode: string;
  errMsg: string;
  owner: string;
  users: string[];
}

export interface IBoards {
  boards: IBoard[];
  isLoading: boolean;
  statusCode: string;
  errMsg: string;
  isUpdateNeeded: boolean;
}

const initialBoards: IBoards = {
  boards: [],
  isLoading: false,
  statusCode: '',
  errMsg: '',
  isUpdateNeeded: false,
};

export interface IGetBoardsResp {
  boards: IBoard[];
  statusCode: string;
  errMsg: string;
}

export interface IBoardResp {
  board: IBoard;
  statusCode: string;
  errMsg: string;
}

interface IBoardReq {
  token: string;
  id: string;
}

interface INewBoard {
  title: string;
  description: string;
  owner: string;
  users: string[];
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

export const deleteBoard = createAsyncThunk<IBoardResp, IBoardReq>(
  'boards/deleteBoard',
  async function ({ token, id }) {
    const boardResp: IBoardResp = {
      board: {
        isLoading: false,
        _id: '',
        title: '',
        description: '',
        statusCode: '',
        errMsg: '',
        owner: '',
        users: [],
      },
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as IBoard;

      if (Array.isArray(data)) {
        boardResp.board = data;
      } else {
        Object.assign(boardResp, data);
      }
    } catch (e: unknown) {
      boardResp.statusCode = '1';
      boardResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return boardResp;
    }
  }
);

export const createBoard = createAsyncThunk<IBoardResp, { board: INewBoard; token: string }>(
  'boards/createBoard',
  async function ({ token, board }) {
    const boardResp: IBoardResp = {
      board: {
        isLoading: false,
        _id: '',
        title: '',
        description: '',
        statusCode: '',
        errMsg: '',
        owner: '',
        users: [],
      },
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });

      const data = (await resp.json()) as IBoard;

      if (Array.isArray(data)) {
        boardResp.board = data;
      } else {
        Object.assign(boardResp, data);
      }
    } catch (e: unknown) {
      boardResp.statusCode = '1';
      boardResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return boardResp;
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
    clearBoardsError(boards) {
      boards.statusCode = '';
      boards.errMsg = '';
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
        boards.isUpdateNeeded = false;
      })
      .addCase(deleteBoard.pending, (boards) => {
        boards.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (boards, action) => {
        const { statusCode, errMsg } = action.payload;
        boards.errMsg = errMsg;
        boards.statusCode = statusCode;
        boards.isLoading = false;
        boards.isUpdateNeeded = !errMsg;
      })
      .addCase(createBoard.pending, (boards) => {
        boards.isLoading = true;
      })
      .addCase(createBoard.fulfilled, (boards, action) => {
        const { statusCode, errMsg } = action.payload;
        boards.errMsg = errMsg;
        boards.statusCode = statusCode;
        boards.isLoading = false;
        boards.isUpdateNeeded = !errMsg;
      });
  },
});

export const { resetBoards, clearBoardsError } = boardsSlice.actions;
export default boardsSlice.reducer;
