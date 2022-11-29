import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.loader}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
