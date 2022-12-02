import React, { useEffect } from 'react';
import classes from './Board.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
import { hideDeleteModal, showCreateModal, showDeleteModal } from 'store/modalsSlice';
import callDeleteModal from 'components/modals/DeleteModal';

const Board = () => {
  const { title, _id, description, statusCode, errMsg, isLoading, isDeleted } = useAppSelector(
    (state) => state.board
  );
  const { columns, colIsLoading, colStatusCode, colErrMsg, isUpdateNeeded } = useAppSelector(
    (state) => state.columns
  );
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();
  const { state } = useLocation();
  const boardId: string = state?.id || '';
  const navigate = useNavigate();
  const { isDeleteShown, type, id: colId } = useAppSelector((state) => state.modals);

  useEffect(() => {
    if (!boardId) {
      navigate('/');
    }
  }, [boardId, navigate]);

  useEffect(() => {
    dispatch(getBoardData({ token, id: boardId }));
  }, [boardId, dispatch, token]);

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
          switch (type) {
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
              console.log('delete task action');
          }
        },
        onCancel: () => {
          dispatch(hideDeleteModal());
        },
      });
    }
  }, [colId, boardId, dispatch, isDeleteShown, token, type]);

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
                  icon={<EditOutlined />}
                  type={'primary'}
                  onClick={() => console.log('edit board callback')}
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
              columns.map(({ _id, title }) => <TaskListTemplate key={_id} title={title} id={_id} />)
            ) : (
              <Loader />
            )}
            {!colIsLoading ? (
              <CreateTaskTemplate
                onClick={() => {
                  dispatch(showCreateModal());
                }}
              />
            ) : null}
          </div>
          <CreateModal
            type="Column"
            onCreate={({ title }) => {
              dispatch(
                createColumn({
                  token,
                  column: {
                    title,
                    order: 1,
                  },
                  boardId: _id,
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
