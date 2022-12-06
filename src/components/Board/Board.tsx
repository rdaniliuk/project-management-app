import React, { useEffect } from 'react';
import classes from './Board.module.css';
import { Button } from 'antd';
import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import TaskListTemplate from 'components/TaskListTemplate/TaskListTemplate';
import CreateModal from 'components/modals/CreateModal';
import CreateTaskTemplate from 'components/CreateTaskTemplate/CreateTaskTemplate';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, getBoardData, resetBoard } from 'store/boardSlice';
import { getColumns, resetColumns, deleteColumn, createColumn } from 'store/columnsSlice';
import { notification } from 'antd';
import { authErr, resetAuth } from 'store/authSlice';
import Loader from 'components/Loader/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  hideDeleteModal,
  hideInfoModal,
  showCreateModal,
  showDeleteModal,
} from 'store/modalsSlice';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import callDeleteModal from 'components/modals/DeleteModal';
import { getTasks, updateTasks, updateTaskDips, resetTasks, deleteTask } from 'store/tasksSlice';
import callInfoModal from 'components/modals/Info';

const Board = () => {
  const { title, _id, description, statusCode, errMsg, isLoading, isDeleted } = useAppSelector(
    (state) => state.board
  );
  const { columns, colIsLoading, colStatusCode, colErrMsg, isUpdateNeeded } = useAppSelector(
    (state) => state.columns
  );
  const { tasks, tasksIsUpdateNeeded } = useAppSelector((state) => state.tasks);

  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();
  const { state } = useLocation();
  const boardId: string = state?.id || '';
  const navigate = useNavigate();
  const {
    isDeleteShown,
    modalType,
    id: colId,
    isInfoShown,
    title: titleInfo,
    description: descInfo,
  } = useAppSelector((state) => state.modals);

  useEffect(() => {
    if (!boardId) {
      navigate('/');
    }
  }, [boardId, navigate]);

  useEffect(() => {
    dispatch(getBoardData({ token, id: boardId }));
  }, [boardId, dispatch, token]);

  useEffect(() => {
    return () => {
      dispatch(resetBoard());
      dispatch(resetColumns());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!token || !_id) return;
    dispatch(getColumns({ token, boardId: _id }));
    return;
  }, [_id, dispatch, token, isUpdateNeeded]);

  useEffect(() => {
    if (statusCode && authErr.includes(+statusCode)) {
      dispatch(resetAuth());
      dispatch(resetBoard);
      return;
    }
    if (errMsg) {
      notify['error']({
        message: 'Error',
        description: errMsg,
      });
    }
  }, [dispatch, errMsg, notify, statusCode]);

  useEffect(() => {
    if (colStatusCode && authErr.includes(+colStatusCode)) {
      dispatch(resetAuth());
      dispatch(resetColumns);
      return;
    }
    if (colErrMsg) {
      notify['error']({
        message: 'Error',
        description: colErrMsg,
      });
    }
  }, [dispatch, colErrMsg, notify, colStatusCode]);

  useEffect(() => {
    if (isDeleteShown) {
      callDeleteModal({
        onOk: () => {
          dispatch(hideDeleteModal());
          switch (modalType) {
            case 'board':
              dispatch(deleteBoard({ token, id: boardId }));
              break;
            case 'column':
              dispatch(
                deleteColumn({
                  token,
                  id: colId,
                  boardId: boardId,
                })
              );
              break;
            case 'task':
              const [columnId, taskId] = colId.split('-');
              dispatch(
                deleteTask({
                  token,
                  boardId,
                  columnId,
                  taskId,
                })
              );
          }
        },
        onCancel: () => {
          dispatch(hideDeleteModal());
        },
      });
    }
  }, [colId, boardId, dispatch, isDeleteShown, token, modalType]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(resetBoard());
      navigate('/');
    }
  }, [dispatch, isDeleted, navigate]);

  useEffect(() => {
    if (isUpdateNeeded) {
      dispatch(resetColumns());
    }
  }, [dispatch, isUpdateNeeded, navigate]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (source.droppableId === destination?.droppableId) {
      const column = columns.find((col) => col._id === source.droppableId);
      const columnTasks = tasks.filter((task) => task.columnId === column?._id);
      const sourceTask = columnTasks.find((task, index) => index === source.index);
      let updateColumnTasks = columnTasks;
      if (!sourceTask) {
        return;
      }
      updateColumnTasks.splice(
        updateColumnTasks.findIndex((task) => task._id === sourceTask?._id),
        1
      );
      updateColumnTasks.splice(destination.index, 0, sourceTask);

      updateColumnTasks = updateColumnTasks.map((task, index) => {
        return { ...task, order: index };
      });

      updateColumnTasks = updateColumnTasks.sort((a, b) => a.order - b.order);
      dispatch(updateTaskDips({ id: source.droppableId, tasks: updateColumnTasks }));
      dispatch(updateTasks(updateColumnTasks));
    }
  };

  useEffect(() => {
    if (isInfoShown) {
      callInfoModal({
        title: titleInfo,
        description: descInfo,
        onOk: () => {
          dispatch(hideInfoModal());
        },
      });
    }
  }, [descInfo, dispatch, isInfoShown, titleInfo]);

  return (
    <div className={classes.board}>
      {contextHolder}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.header}>
            <div className={classes.info}>
              <div className={classes.name}>{title}</div>
              <div className={classes.description}>{description}</div>
            </div>
            <div className={classes.buttons}>
              <div className={classes.edit}>
                <Button
                  icon={<RollbackOutlined />}
                  type={'primary'}
                  onClick={() => {
                    dispatch(resetBoard());
                    navigate('/');
                  }}
                />
              </div>
              <div className={classes.delete}>
                <Button
                  icon={<DeleteOutlined />}
                  type={'primary'}
                  onClick={() => dispatch(showDeleteModal({ id: boardId, type: 'board' }))}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className={classes.list}>
            {!colIsLoading ? (
              <DragDropContext onDragEnd={onDragEnd}>
                {columns.map(({ _id, title, order }) => (
                  <TaskListTemplate
                    key={_id}
                    title={title}
                    id={_id}
                    token={token}
                    boardId={boardId}
                    order={order}
                  />
                ))}
              </DragDropContext>
            ) : (
              <Loader />
            )}
            {!colIsLoading ? (
              <CreateTaskTemplate
                onClick={() => {
                  dispatch(showCreateModal({ modalType: 'column' }));
                }}
              />
            ) : null}
          </div>
          <CreateModal
            type="column"
            onCreate={({ title }) => {
              dispatch(
                createColumn({
                  boardId,
                  column: { title },
                })
              );
            }}
          />
        </>
      )}
    </div>
  );
};

export default Board;
