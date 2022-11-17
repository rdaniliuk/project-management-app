import { AppstoreAddOutlined } from '@ant-design/icons';
import React from 'react';
import classes from './CreateBoardTemplate.module.css';
import { Button } from 'antd';

const CreateBoardTemplate = () => {
  return (
    <div className={classes.template}>
      <Button
        icon={<AppstoreAddOutlined />}
        size={'large'}
        type={'link'}
        onClick={() => console.log('create board callback')}
      />
    </div>
  );
};

export default CreateBoardTemplate;
