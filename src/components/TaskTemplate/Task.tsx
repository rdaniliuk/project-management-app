import React from 'react';
import classes from './Task.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Task = () => {
  const testTaskData = {
    name: 'test task name',
    description: 'test description okoko okokok okok',
  };
  return (
    <div className={classes.task}>
      <div onClick={() => console.log('task info callback')}>
        <span>{testTaskData.name}</span>
      </div>
      <div className={classes.buttons}>
        <div className={classes.edit}>
          <Button
            icon={<EditOutlined />}
            type={'text'}
            onClick={() => console.log('edit task callback')}
          />
        </div>
        <div className={classes.delete}>
          <Button
            icon={<DeleteOutlined />}
            type={'text'}
            onClick={() => console.log('delete task callback')}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
