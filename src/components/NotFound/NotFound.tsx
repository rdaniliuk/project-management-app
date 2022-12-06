import React from 'react';
import classes from './NotFound.module.css';
import { NOT_FOUND_IMAGE } from 'imageLink';
import { HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <p>Oops! Something Went Wrong</p>
      <Button icon={<HomeOutlined />} type={'link'} onClick={() => navigate('/')}>
        Back to Home
      </Button>
      <img src={NOT_FOUND_IMAGE} alt="not-found-image" />
    </div>
  );
};

export default NotFound;
