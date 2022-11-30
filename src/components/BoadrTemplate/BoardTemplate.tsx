import { DeleteTwoTone } from '@ant-design/icons';
import React from 'react';
import classes from './BoardTemplate.module.css';
import { Button } from 'antd';
import { useAppDispatch } from 'store/hooks';
import { showDeleteModal } from 'store/modalsSlice';
import { useNavigate } from 'react-router-dom';

const BoardTemplate = (props: { title: string; description: string; id: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteBtnHandle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const boardId = (e.currentTarget as HTMLElement).dataset.id || '';

    if (boardId) {
      e.stopPropagation();
      dispatch(showDeleteModal({ id: boardId, type: 'board' }));
    }
  };

  return (
    <div
      className={classes.template}
      id={props.id}
      onClick={() => navigate('/board', { state: { id: props.id } })}
    >
      <div className={classes.board__header}>
        <div className={classes.board__name}>
          <span>{props.title}</span>
        </div>
        <div className={classes.board__buttons}>
          <div className={classes.board__delete}>
            <Button
              data-id={props.id}
              icon={<DeleteTwoTone />}
              size={'large'}
              type={'link'}
              onClick={deleteBtnHandle}
            />
          </div>
        </div>
      </div>
      <hr className={classes.board__hr} />
      <div className={classes.board__description}>
        <span>{props.description}</span>
      </div>
    </div>
  );
};

export default BoardTemplate;
