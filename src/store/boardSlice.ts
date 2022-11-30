import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../store/apiUrls';
import { IBoard, IBoardReq } from './boardsSlice';

const initialBoard: IBoard = {
  isLoading: false,
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
      });
  },
});

export const { resetBoard } = boardSlice.actions;
export default boardSlice.reducer;
