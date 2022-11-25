import React from 'react';
import classes from './Header.module.css';
import 'antd/dist/antd.css';
import {
  LayoutTwoTone,
  LoginOutlined,
  LogoutOutlined,
  ScheduleTwoTone,
  UserAddOutlined,
  UserOutlined,
  ZhihuCircleFilled,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useHeader } from 'components/hooks/useHeader';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resetAuth } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const headerWrapper = useHeader();
  const { isLogged } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className={classes.header} ref={headerWrapper}>
      <Button icon={<LayoutTwoTone />} size={'large'} type={'link'}></Button>
      {isLogged ? (
        <div className={classes.userSettings}>
          <Button
            icon={<ScheduleTwoTone />}
            size={'large'}
            type={'link'}
            onClick={() => navigate('/')}
          >
            Boards
          </Button>
        </div>
      ) : null}
      <div>
        <Button icon={<ZhihuCircleFilled />} size={'large'} type={'link'}>
          EN
        </Button>
        {isLogged ? (
          <>
            <Button icon={<UserOutlined />} size={'large'} type={'link'} onClick={() => {}}>
              Profile
            </Button>
            <Button
              icon={<LogoutOutlined />}
              size={'large'}
              type={'link'}
              onClick={() => {
                dispatch(resetAuth());
                navigate('/welcome');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<UserAddOutlined />}
              size={'large'}
              type={'link'}
              onClick={() => navigate('/auth', { state: 'signup' })}
            >
              Sign up
            </Button>
            <Button
              icon={<LoginOutlined />}
              size={'large'}
              type={'link'}
              onClick={() => navigate('/auth')}
            >
              Sign in
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
