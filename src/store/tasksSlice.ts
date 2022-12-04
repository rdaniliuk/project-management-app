import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOARDS_URL } from '../store/apiUrls';

interface ITask {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  userId: string;
  users: string[];
  order: number;
}

export interface ITasks {
  tasks: ITask[];
  tasksLoading: boolean;
  tasksStatusCode: string;
  tasksErrMsg: string;
  tasksIsUpdateNeeded: boolean;
}

interface IGetTasksResp {
  tasks: ITask[];
  tasksStatusCode: string;
  tasksErrMsg: string;
}

const initialTasks: ITasks = {
  tasks: [],
  tasksLoading: false,
  tasksStatusCode: '',
  tasksErrMsg: '',
  tasksIsUpdateNeeded: false,
};

interface IGetTasksReq {
  token: string;
  boardId: string;
  columnId: string;
}

export const getTasks = createAsyncThunk<IGetTasksResp, IGetTasksReq>(
  'tasks/getTasks',
  async function ({ token, boardId, columnId }) {
    const getTasksResp = {
      tasks: [
        {
          boardId: '',
          columnId: '',
          description: '',
          order: 0,
          title: '',
          userId: '',
          users: [],
          _id: '',
        },
      ],
      tasksStatusCode: '',
      tasksErrMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as ITasks;
      if (Array.isArray(data)) {
        getTasksResp.tasks = data;
      } else {
        Object.assign(getTasksResp, data);
      }
    } catch (e: unknown) {
      getTasksResp.tasksStatusCode = '1';
      getTasksResp.tasksErrMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return getTasksResp;
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasks,
  reducers: {
    resetTasks() {
      return initialTasks;
    },
    clearTasksError(tasks) {
      tasks.tasksStatusCode = '';
      tasks.tasksErrMsg = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (tasks) => {
        tasks.tasksLoading = true;
      })
      .addCase(getTasks.fulfilled, (tasks, action) => {
        const { tasks: allTasks, tasksStatusCode, tasksErrMsg } = action.payload;
        tasks.tasks = allTasks;
        tasks.tasksErrMsg = tasksErrMsg;
        tasks.tasksStatusCode = tasksStatusCode;
        tasks.tasksLoading = false;
        tasks.tasksIsUpdateNeeded = false;
      });
  },
});

export const { resetTasks, clearTasksError } = tasksSlice.actions;
export default tasksSlice.reducer;
