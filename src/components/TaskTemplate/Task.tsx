import React from 'react';
import classes from './Task.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { showDeleteModal } from 'store/modalsSlice';
import { useAppDispatch } from 'store/hooks';
import { Draggable } from 'react-beautiful-dnd';

interface ITaskProps {
  name: string;
  description: string;
  id: string;
  index: number;
}

const Task = (props: ITaskProps) => {
  const dispatch = useAppDispatch();

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          className={classes.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div onClick={() => console.log('task info callback')}>
            <span>{props.name}</span>
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
                onClick={() => dispatch(showDeleteModal({ id: '', type: 'task' }))}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
