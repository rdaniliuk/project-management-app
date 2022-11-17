import React from 'react';
import classes from './Screen.module.css';
import StartScreen from '../StartScreen/StartScreen';
import Main from 'components/Main/Main';
const testLoginStatus = true;
const Screen = () => {
  return <div className={classes.Screen}>{testLoginStatus ? <Main /> : <StartScreen />}</div>;
};

export default Screen;
