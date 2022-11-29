import React, { useEffect } from 'react';
import classes from './Board.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TaskListTemplate from 'components/TaskListTemplate/TaskListTemplate';
import CreateModal from 'components/modals/CreateModal';
import DeleteModal from 'components/modals/DeleteModal';
import Info from 'components/modals/Info';
import CreateTaskTemplate from 'components/CreateTaskTemplate/CreateTaskTemplate';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getBoardData, resetBoard } from 'store/boardSlice';
import { getColumns, resetColumns } from 'store/columnsSlice';
import { notification } from 'antd';
import { authErr, resetAuth } from 'store/authSlice';
import Loader from 'components/Loader/Loader';

const Board = () => {
  const { title, _id, description, statusCode, errMsg, isLoading } = useAppSelector(
    (state) => state.board
  );
  const { columns, colIsLoading, colStatusCode, colErrMsg } = useAppSelector(
    (state) => state.columns
  );
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(getBoardData(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (!token || !_id) return;
    dispatch(getColumns({ token, boardId: _id }));
  }, [dispatch, token, _id]);

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

  return (
    <div className={classes.board}>
      {contextHolder}
      {isLoading ? <Loader /> : null}
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
              onClick={() => console.log('delete board callback')}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className={classes.list}>
        {contextHolder}
        {colIsLoading || isLoading ? <Loader /> : null}
        {!colIsLoading
          ? columns.map(({ _id, title }) => <TaskListTemplate key={_id} title={title} id={_id} />)
          : null}
        {!colIsLoading && !isLoading ? <CreateTaskTemplate /> : null}
      </div>
    </div>
  );
};

export default Board;
