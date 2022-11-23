import React from 'react';
import classes from './Main.module.css';
import CreateBoardTemplate from 'components/CreateBoardTemplate/CreateBoardTemplate';
import BoardTemplate from 'components/BoadrTemplate/BoardTemplate';
import Loader from 'components/Loader/Loader';

const Main = () => {
  const boardTestData = {
    name: 'Test Name',
    description: 'test test test  test test test',
  };
  return (
    <div className={classes.main}>
      <BoardTemplate {...boardTestData} />
      <BoardTemplate {...boardTestData} />
      <CreateBoardTemplate />
    </div>
  );
};

export default Main;
