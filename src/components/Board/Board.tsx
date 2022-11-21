import React from 'react';
import classes from './Board.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TaskListTemplate from 'components/TaskListTemplate/TaskListTemplate';
import CreateBoard from 'components/modals/CreateBoard';
import DeleteModal from 'components/modals/DeleteModal';
import Info from 'components/modals/Info';

const Board = () => {
  const boardTestData = {
    name: 'Test Name',
    description: 'testtestt esttesttest testtestt ',
  };
  return (
    <div className={classes.board}>
      <div className={classes.header}>
        <div className={classes.info}>
          <div className={classes.name}>{boardTestData.name}</div>
          <div className={classes.description}>{boardTestData.description}</div>
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
        <TaskListTemplate />
        <TaskListTemplate />
      </div>
    </div>
  );
};

export default Board;
