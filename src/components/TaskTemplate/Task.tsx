import React from 'react';
import classes from './Task.module.css';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { showDeleteModal, showInfoModal } from 'store/modalsSlice';
import { useAppDispatch } from 'store/hooks';
import { Draggable } from 'react-beautiful-dnd';

interface ITaskProps {
  title: string;
  description: string;
  id: string;
  columnId: string;
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
          <div
            onClick={() =>
              dispatch(showInfoModal({ title: props.title, description: props.description }))
            }
          >
            <span>{props.title}</span>
          </div>
          <div className={classes.buttons}>
            <div className={classes.edit}>
              <Button icon={<EditOutlined />} type={'text'} />
            </div>
            <div className={classes.delete}>
              <Button
                icon={<DeleteOutlined />}
                type={'text'}
                onClick={() =>
                  dispatch(showDeleteModal({ id: `${props.columnId}-${props.id}`, type: 'task' }))
                }
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
