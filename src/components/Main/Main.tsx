import React, { useEffect } from 'react';
import classes from './Main.module.css';
import CreateBoardTemplate from 'components/CreateBoardTemplate/CreateBoardTemplate';
import BoardTemplate from 'components/BoadrTemplate/BoardTemplate';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Loader from 'components/Loader/Loader';
import { getBoards, resetBoards } from 'store/boardsSlice';
import { authErr, resetAuth } from 'store/authSlice';
import { notification } from 'antd';
import Board from 'components/Board/Board';

const Main = () => {
  const { boards, isLoading, statusCode, errMsg } = useAppSelector((state) => state.boards);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();

  useEffect(() => {
    dispatch(getBoards(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (statusCode && authErr.includes(+statusCode)) {
      dispatch(resetAuth());
      dispatch(resetBoards);
      return;
    }
    if (errMsg) {
      notify['error']({
        message: 'Error',
        description: errMsg,
      });
    }
  }, [dispatch, errMsg, notify, statusCode]);

  return (
    <div className={classes.main}>
      {contextHolder}
      {isLoading && <Loader />}
      {!isLoading &&
        boards.map(({ boardId, title, description }) => (
          <BoardTemplate key={boardId} id={boardId} title={title} description={description} />
        ))}
      {!isLoading && <CreateBoardTemplate />}
    </div>
  );
};

export default Main;
