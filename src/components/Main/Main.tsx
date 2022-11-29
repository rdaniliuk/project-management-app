import React, { useEffect } from 'react';
import classes from './Main.module.css';
import CreateBoardTemplate from 'components/CreateBoardTemplate/CreateBoardTemplate';
import BoardTemplate from 'components/BoadrTemplate/BoardTemplate';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Loader from 'components/Loader/Loader';
import { deleteBoard, getBoards, resetBoards, clearBoardsError } from 'store/boardsSlice';
import { authErr, resetAuth } from 'store/authSlice';
import { notification } from 'antd';
import { hideDeleteModal, resetValues, showCreateModal } from 'store/modalsSlice';
import callDeleteModal from 'components/modals/DeleteModal';
import CreateModal from 'components/modals/CreateModal';

const Main = () => {
  const { boards, isLoading, statusCode, errMsg, isUpdateNeeded } = useAppSelector(
    (state) => state.boards
  );
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();
  const { isDeleteShown, boardId } = useAppSelector((state) => state.modals);

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
      dispatch(clearBoardsError());
    }
  }, [dispatch, errMsg, notify, statusCode]);

  useEffect(() => {
    if (isDeleteShown) {
      callDeleteModal({
        onOk: () => {
          dispatch(hideDeleteModal());
          dispatch(deleteBoard({ token, id: boardId }));
        },
        onCancel: () => {
          dispatch(hideDeleteModal());
        },
      });
    }
  }, [boardId, dispatch, isDeleteShown, token]);

  useEffect(() => {
    if (isUpdateNeeded) {
      dispatch(getBoards(token));
    }
  }, [dispatch, isUpdateNeeded, token]);

  return (
    <div className={classes.main}>
      {contextHolder}
      {isLoading && <Loader />}
      {!isLoading &&
        boards.map(({ _id, title, description }) => (
          <BoardTemplate key={_id} id={_id} title={title} description={description} />
        ))}
      {!isLoading && (
        <CreateBoardTemplate
          onClick={() => {
            dispatch(resetValues());
            dispatch(showCreateModal());
          }}
        />
      )}
      <CreateModal type="Board" />
    </div>
  );
};

export default Main;
