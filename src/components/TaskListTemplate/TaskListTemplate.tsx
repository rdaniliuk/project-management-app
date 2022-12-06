import React, { useState } from 'react';
import classes from './TaskListTemplate.module.css';
import { Button } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import Task from 'components/TaskTemplate/Task';
import { showCreateModal, showDeleteModal } from 'store/modalsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateColumn } from 'store/columnsSlice';
import { Droppable } from 'react-beautiful-dnd';
import CreateModal from 'components/modals/CreateModal';
import { createTask } from 'store/tasksSlice';

interface TaskListProps {
  title: string;
  id: string;
  token: string;
  boardId: string;
  order: number;
}

const TaskListTemplate = (props: TaskListProps) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [renameListStatus, setRenameListStatus] = useState(false);
  const [listName, setListName] = useState(props.title);
  const [listNameBeforeChange, setListNameBeforeChange] = useState(listName);
  const columnId = props.id;

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        {!renameListStatus ? (
          <>
            <div
              className={classes.list__name}
              onClick={() => {
                setRenameListStatus(true);
              }}
            >
              <span>{listName}</span>
            </div>
            <div className={classes.list__delete}>
              <Button
                icon={<PlusCircleOutlined style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => dispatch(showCreateModal({ modalType: 'task', modalId: columnId }))}
              />
              <Button
                icon={<DeleteFilled style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => dispatch(showDeleteModal({ id: props.id, type: 'column' }))}
              />
            </div>
            <CreateModal
              modalId={columnId}
              type="task"
              onCreate={({ title, description }) => {
                dispatch(
                  createTask({
                    title: title,
                    order: 0,
                    description: description,
                    userId: 0,
                    users: [],
                    boardId: props.boardId,
                    columnId: columnId,
                  })
                );
              }}
            />
          </>
        ) : (
          <>
            <div className={classes.list__name}>
              <Input
                value={listName}
                maxLength={25}
                onChange={(e) => {
                  setListName(e.target.value);
                }}
              />
            </div>
            <div className={classes.list__delete}>
              <Button
                icon={<CheckCircleOutlined style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => {
                  setRenameListStatus(false);
                  setListNameBeforeChange(listName);
                  dispatch(
                    updateColumn({
                      id: props.id,
                      token: props.token,
                      boardId: props.boardId,
                      newTitle: listName,
                    })
                  );
                }}
              />
              <Button
                icon={<CloseCircleOutlined style={{ color: '#fff' }} />}
                type={'link'}
                onClick={() => {
                  setListName(listNameBeforeChange);
                  setRenameListStatus(false);
                }}
              />
            </div>
          </>
        )}
      </div>
      <Droppable droppableId={props.id}>
        {(provided) => {
          return (
            <div className={classes.tasks} {...provided.droppableProps} ref={provided.innerRef}>
              {tasks
                .filter((task) => task.columnId === props.id)
                .map((task, index) => (
                  <Task
                    key={task._id}
                    title={task.title}
                    description={task.description}
                    id={task._id}
                    columnId={props.id}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default TaskListTemplate;
