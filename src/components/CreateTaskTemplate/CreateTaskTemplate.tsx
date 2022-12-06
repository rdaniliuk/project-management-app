import { AppstoreAddOutlined } from '@ant-design/icons';
import React from 'react';
import classes from './CreateTaskTemplate.module.css';
import { Button } from 'antd';

const CreateTaskTemplate = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={classes.template} onClick={onClick}>
      <Button
        icon={<AppstoreAddOutlined style={{ color: '#5450ff' }} />}
        size={'large'}
        type={'link'}
      />
    </div>
  );
};

export default CreateTaskTemplate;
