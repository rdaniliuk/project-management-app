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
}

const initialColumns: IColumns = {
  columns: [],
  colIsLoading: false,
  colStatusCode: '',
  colErrMsg: '',
};

interface IGetColumnsResp {
  columns: IColumn[];
  statusCode: string;
  errMsg: string;
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
      });
  },
});

export const { resetColumns } = columnsSlice.actions;
export default columnsSlice.reducer;
