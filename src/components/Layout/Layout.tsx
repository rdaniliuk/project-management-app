import React from 'react';
import classes from './Layout.module.css';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={classes.outlet}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
