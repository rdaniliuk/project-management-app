import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../store/apiUrls';

interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

interface IColumns {
  columns: IColumn[];
  colIsLoading: boolean;
  colStatusCode: string;
  colErrMsg: string;
  isUpdateNeeded: boolean;
}

const initialColumns: IColumns = {
  columns: [],
  colIsLoading: false,
  colStatusCode: '',
  colErrMsg: '',
  isUpdateNeeded: false,
};

interface IGetColumnsResp {
  columns: IColumn[];
  statusCode: string;
  errMsg: string;
}

export interface IColumnResp {
  column: IColumn;
  statusCode: string;
  errMsg: string;
}

export interface IColumnReq {
  token: string;
  id: string;
  boardId: string;
}

export const getColumns = createAsyncThunk<IGetColumnsResp, { token: string; boardId: string }>(
  'columns/getColumns',
  async function ({ token, boardId }) {
    const getColumnsResp: IGetColumnsResp = {
      columns: [],
      statusCode: '',
      errMsg: '',
    };

    try {
      const response = await fetch(`${BOARDS_URL}/${boardId}/columns`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await response.json()) as IColumn;

      if (Array.isArray(data)) {
        getColumnsResp.columns = data;
      } else {
        Object.assign(getColumnsResp, data);
      }
    } catch (e: unknown) {
      getColumnsResp.statusCode = '1';
      getColumnsResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return getColumnsResp;
    }
  }
);

export const deleteColumn = createAsyncThunk<IColumnResp, IColumnReq>(
  'columns/deleteColumn',
  async function ({ token, id, boardId }) {
    const columnResp: IColumnResp = {
      column: {
        _id: '',
        title: '',
        order: 0,
        boardId: '',
      },
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}/${boardId}/columns/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = (await resp.json()) as IColumn;
      Object.assign(columnResp, data);
    } catch (e: unknown) {
      columnResp.statusCode = '1';
      columnResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return columnResp;
    }
  }
);

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initialColumns,
  reducers: {
    resetColumns() {
      return initialColumns;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumns.pending, (columns) => {
        columns.colIsLoading = true;
      })
      .addCase(getColumns.fulfilled, (columns, action) => {
        const { columns: allColumns, statusCode, errMsg } = action.payload;
        columns.columns = allColumns;
        columns.colErrMsg = errMsg;
        columns.colStatusCode = statusCode;
        columns.colIsLoading = false;
      })
      .addCase(deleteColumn.pending, (columns) => {
        columns.colIsLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (columns, action) => {
        const { statusCode, errMsg } = action.payload;
        columns.colErrMsg = errMsg;
        columns.colStatusCode = statusCode;
        columns.colIsLoading = false;
        columns.isUpdateNeeded = !errMsg;
      });
  },
});

export const { resetColumns } = columnsSlice.actions;
export default columnsSlice.reducer;
