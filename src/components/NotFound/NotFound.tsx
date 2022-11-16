import React from 'react';
import classes from './NotFound.module.css';
import { NOT_FOUND_IMAGE } from 'imageLink';
import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NotFound = () => {
  return (
    <div className={classes.wrapper}>
      <p>Oops! Something Went Wrong</p>
      <Button
        icon={<HomeOutlined />}
        type={'link'}
        onClick={() => console.log('back to home link')}
      >
        Back to Home
      </Button>
      <img src={NOT_FOUND_IMAGE} alt="not-found-image" />
    </div>
  );
};

export default NotFound;
