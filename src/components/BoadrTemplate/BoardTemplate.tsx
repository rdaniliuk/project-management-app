import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import React from 'react';
import classes from './BoardTemplate.module.css';
import { Button } from 'antd';

const BoardTemplate = (props: { name: string; description: string }) => {
  return (
    <div className={classes.template} onClick={() => console.log('open board callback')}>
      <div className={classes.board__header}>
        <div className={classes.board__name}>
          <span>{props.name}</span>
        </div>
        <div className={classes.board__buttons}>
          <div className={classes.board__change}>
            <Button
              icon={<EditTwoTone />}
              size={'large'}
              type={'link'}
              onClick={() => console.log('edit board callback')}
            />
          </div>
          <div className={classes.board__delete}>
            <Button
              icon={<DeleteTwoTone />}
              size={'large'}
              type={'link'}
              onClick={() => console.log('delete board callback')}
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
