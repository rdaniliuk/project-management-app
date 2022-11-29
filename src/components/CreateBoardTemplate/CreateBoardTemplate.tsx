import { AppstoreAddOutlined } from '@ant-design/icons';
import React from 'react';
import classes from './CreateBoardTemplate.module.css';
import { Button } from 'antd';

const CreateBoardTemplate = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={classes.template} onClick={onClick}>
      <Button icon={<AppstoreAddOutlined />} size={'large'} type={'link'} />
    </div>
  );
};

export default CreateBoardTemplate;
