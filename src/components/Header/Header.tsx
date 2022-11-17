import React from 'react';
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
import { useHeader } from 'components/hooks/useHeader';

const Header = () => {
  const { loginStatus, setLoginStatus, headerWrapper } = useHeader();

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
        <Button
          icon={<ZhihuCircleFilled />}
          size={'middle'}
          type={'link'}
          onClick={() => {
            console.log('language callback');
          }}
        >
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
