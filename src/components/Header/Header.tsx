import React from 'react';
import classes from './Header.module.css';
import 'antd/dist/antd.css';
import {
  LayoutTwoTone,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
  ZhihuCircleFilled,
} from '@ant-design/icons';
import { LOGO_IMAGE } from 'imageLink';
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
      <div className={classes.header__logo}>
        <img src={LOGO_IMAGE} alt="logo" />
      </div>
      <div>
        <Button icon={<ZhihuCircleFilled />} size={'large'} type={'link'}>
          EN
        </Button>
        {isLogged ? (
          <Button
            icon={<LayoutTwoTone />}
            size={'large'}
            type={'link'}
            onClick={() => navigate('/')}
          >
            <div className={classes.button__name}>Boards</div>
          </Button>
        ) : null}
        {isLogged ? (
          <>
            <Button icon={<UserOutlined />} size={'large'} type={'link'} onClick={() => {}}>
              <div className={classes.button__name}>Profile</div>
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
              <div className={classes.button__name}>Logout</div>
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<UserAddOutlined />}
              size={'large'}
              type={'link'}
              onClick={() => navigate('/auth', { state: { isSignUp: true } })}
            >
              <div className={classes.button__name}>Sign up</div>
            </Button>
            <Button
              icon={<LoginOutlined />}
              size={'large'}
              type={'link'}
              onClick={() => navigate('/auth')}
            >
              <div className={classes.button__name}>Sign in</div>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
