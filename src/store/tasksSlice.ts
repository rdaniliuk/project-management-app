import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BOARDS_URL, TASKS_SET } from '../store/apiUrls';

export interface ITask {
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

interface IGetTaskResp extends ITask {
  statusCode: string;
  errMsg: string;
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

interface IUpdate extends IGetTasksReq {
  taskId: string;
  newTask: ITask;
}

interface ICreateReq {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: string[];
  boardId: string;
  columnId: string;
}

interface IUpdateTasksItem {
  _id: string;
  order: number;
  columnId: string;
}

interface IUpdateTasksResp {
  tasks: ITask[];
  statusCode: string;
  errMsg: string;
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

export const createTask = createAsyncThunk<IGetTaskResp, ICreateReq>(
  'task/createTask',
  async function (data) {
    const createTaskResp: IGetTaskResp = {
      boardId: '',
      columnId: '',
      description: '',
      order: 0,
      title: '',
      userId: '',
      users: [],
      _id: '',
      statusCode: '',
      errMsg: '',
    };

    const { boardId, columnId, ...bodyData } = data;
    try {
      const token = localStorage.getItem('pmaTkn');
      const resp = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = (await resp.json()) as ITask;
      Object.assign(createTaskResp, data);
    } catch (e: unknown) {
      createTaskResp.statusCode = '1';
      createTaskResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return createTaskResp;
    }
  }
);

export const updateTask = createAsyncThunk<IGetTaskResp, IUpdate>(
  'tasks/updateTask',
  async function ({ token, taskId, boardId, newTask, columnId }) {
    const updateTaskResp = {
      boardId: '',
      columnId: '',
      description: '',
      order: 0,
      title: '',
      userId: '',
      users: [],
      _id: '',
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTask }),
      });

      const data = (await resp.json()) as ITask;
      Object.assign(updateTaskResp, data);
    } catch (e: unknown) {
      updateTaskResp.statusCode = '1';
      updateTaskResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return updateTaskResp;
    }
  }
);

export const deleteTask = createAsyncThunk<IGetTaskResp, Omit<IUpdate, 'newTask'>>(
  'tasks/deleteTask',
  async function ({ token, taskId, boardId, columnId }) {
    const updateTaskResp = {
      boardId: '',
      columnId: '',
      description: '',
      order: 0,
      title: '',
      userId: '',
      users: [],
      _id: '',
      statusCode: '',
      errMsg: '',
    };

    try {
      const resp = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = (await resp.json()) as ITask;
      Object.assign(updateTaskResp, data);
    } catch (e: unknown) {
      updateTaskResp.statusCode = '1';
      updateTaskResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return updateTaskResp;
    }
  }
);

export const updateTasks = createAsyncThunk<IUpdateTasksResp, ITask[]>(
  'tasks/updateTasks',
  async function (tasks) {
    const updateTaskResp: IUpdateTasksResp = {
      tasks: [],
      statusCode: '',
      errMsg: '',
    };

    const body: IUpdateTasksItem[] = tasks.map((task) => {
      return {
        _id: task._id,
        columnId: task.columnId,
        order: task.order,
      };
    });

    try {
      const token = localStorage.getItem('pmaTkn');
      const resp = await fetch(`${TASKS_SET}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(body),
      });

      const data = (await resp.json()) as ITask[];
      updateTaskResp.tasks = data;
    } catch (e: unknown) {
      updateTaskResp.statusCode = '1';
      updateTaskResp.errMsg = e instanceof Error ? e.message : 'Connection error';
    } finally {
      return updateTaskResp;
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
    updateTaskDips(tasks, action: PayloadAction<{ id: string; tasks: ITask[] }>) {
      tasks.tasks = tasks.tasks
        .filter((task) => task.columnId != action.payload.id)
        .concat(action.payload.tasks); //.sort((a, b) => a.order - b.order));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (tasks) => {
        tasks.tasksLoading = true;
      })
      .addCase(getTasks.fulfilled, (tasks, action) => {
        const { tasks: allTasks, tasksStatusCode, tasksErrMsg } = action.payload;
        tasks.tasks = tasks.tasks.concat(allTasks.sort((a, b) => a.order - b.order));
        tasks.tasksErrMsg = tasksErrMsg;
        tasks.tasksStatusCode = tasksStatusCode;
        tasks.tasksLoading = false;
        tasks.tasksIsUpdateNeeded = false;
      })
      .addCase(updateTasks.fulfilled, (tasks, action) => {
        const { statusCode, errMsg } = action.payload;
        tasks.tasksErrMsg = errMsg;
        tasks.tasksStatusCode = statusCode;
      })
      .addCase(deleteTask.fulfilled, (tasks, action) => {
        const { statusCode, errMsg } = action.payload;
        tasks.tasks = tasks.tasks.filter((task) => task._id != action.payload._id);
        tasks.tasksErrMsg = errMsg;
        tasks.tasksStatusCode = statusCode;
        tasks.tasksLoading = false;
      })
      .addCase(createTask.pending, (tasks) => {
        tasks.tasksLoading = true;
      })
      .addCase(createTask.fulfilled, (tasks, action) => {
        const { statusCode, errMsg, ...task } = action.payload;
        tasks.tasks.push(task);
        tasks.tasksErrMsg = errMsg;
        tasks.tasksStatusCode = statusCode;
        tasks.tasksLoading = false;
        tasks.tasksIsUpdateNeeded = false;
      });
  },
});

export const { resetTasks, clearTasksError, updateTaskDips } = tasksSlice.actions;
export default tasksSlice.reducer;
