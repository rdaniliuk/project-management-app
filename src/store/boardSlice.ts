import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../store/apiUrls';
import { IBoard, IBoardReq, IBoardResp } from './boardsSlice';

interface IBoardState extends IBoard {
  isLoading: boolean;
  isDeleted: boolean;
  statusCode: string;
  errMsg: string;
}

const initialBoard: IBoardState = {
  isLoading: false,
  isDeleted: false,
  _id: '',
  title: '',
  description: '',
  statusCode: '',
  errMsg: '',
  owner: '',
  users: [],
};

interface ITask {
  _id: string;
  title: string;
  description: string;
}

export interface IColumn {
  _id: string;
  title: string;
  tasks: ITask[];
}

interface IGetBoardResp {
  title: string;
  _id: string;
  description: string;
  columns: IColumn[];
  statusCode: string;
  errMsg: string;
}

export const getBoardData = createAsyncThunk<IGetBoardResp, IBoardReq>(
  'board/getBoardData',
  async function ({ token, id }) {
    const getBoardResp: IGetBoardResp = {
      title: '',
      _id: '',
      description: '',
      columns: [],
      statusCode: '',
      errMsg: '',
    };

    try {
      const response = await fetch(`${BOARDS_URL}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await response.json()) as IBoard;
      Object.assign(getBoardResp, data);
    } catch (e: unknown) {
      getBoardResp.statusCode = '1';
      getBoardResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return getBoardResp;
    }
  }
);

export const deleteBoard = createAsyncThunk<IBoardResp, IBoardReq>(
  'board/deleteBoard',
  async function ({ token, id }) {
    const boardResp: IBoardResp = {
      board: {
        _id: '',
        title: '',
        description: '',
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

const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoard,
  reducers: {
    resetBoard() {
      return initialBoard;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.pending, (board) => {
        board.isLoading = true;
      })
      .addCase(getBoardData.fulfilled, (board, action) => {
        const { title, _id, description, statusCode, errMsg } = action.payload;
        board.title = title;
        board._id = _id;
        board.description = description;
        board.statusCode = statusCode;
        board.errMsg = errMsg;
        board.isLoading = false;
      })
      .addCase(deleteBoard.pending, (boards) => {
        boards.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (board, action) => {
        const { statusCode, errMsg } = action.payload;
        board.errMsg = errMsg;
        board.statusCode = statusCode;
        board.isLoading = false;
        board.isDeleted = !errMsg;
      });
  },
});

export const { resetBoard } = boardSlice.actions;
export default boardSlice.reducer;
