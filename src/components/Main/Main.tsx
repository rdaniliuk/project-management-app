import React from 'react';
import classes from './Main.module.css';
import StartScreen from '../StartScreen/StartScreen';

const Main = () => {
  return (
    <div className={classes.main}>
      <StartScreen />
    </div>
  );
};

export default Main;
