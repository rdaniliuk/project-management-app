import React, { useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';
import 'antd/dist/antd.css';
import {
  IdcardTwoTone,
  LayoutTwoTone,
  LogoutOutlined,
  ScheduleTwoTone,
  UserOutlined,
  ZhihuCircleFilled,
} from '@ant-design/icons';
import { Button } from 'antd';

const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const headerWrapper = useRef<HTMLDivElement | null>(null);

  const scroll = () => {
    if (headerWrapper.current) {
      window.pageYOffset > 0
        ? headerWrapper.current.classList.add(`${classes.sticky}`)
        : headerWrapper.current.classList.remove(`${classes.sticky}`);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scroll);
  }, []);

  return (
    <div className={classes.header} ref={headerWrapper}>
      <Button icon={<LayoutTwoTone />} size={'middle'} type={'link'}></Button>
      {loginStatus ? (
        <div className={classes.userSettings}>
          <Button icon={<ScheduleTwoTone />} size={'middle'} type={'link'}></Button>
          <Button icon={<IdcardTwoTone />} size={'middle'} type={'link'}></Button>
        </div>
      ) : null}
      <div>
        <Button icon={<ZhihuCircleFilled />} size={'middle'} type={'link'}>
          EN
        </Button>
        {loginStatus ? (
          <Button
            icon={<LogoutOutlined />}
            size={'middle'}
            type={'link'}
            onClick={() => setLoginStatus(false)}
          ></Button>
        ) : (
          <Button
            icon={<UserOutlined />}
            size={'middle'}
            type={'link'}
            onClick={() => setLoginStatus(true)}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default Header;
