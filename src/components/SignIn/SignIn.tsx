import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import classes from './SignIn.module.css';
import { ISignInOpt, signIn } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useForm } from 'antd/es/form/Form';

const SignIn = () => {
  const [form] = useForm<ISignInOpt>();
  const { isLogged, isLoading, errMsg } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [notify, contextHolder] = notification.useNotification();

  const onFinish = (values: ISignInOpt) => {
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, [isLogged, navigate]);

  useEffect(() => {
    if (errMsg) {
      notify['error']({
        message: 'Error',
        description: errMsg,
      });
    }
  }, [errMsg, notify]);

  return (
    <>
      {contextHolder}
      <div className={classes.formWrapper}>
        {isLoading && <Loader />}
        {!isLoading && (
          <Form name="sign-in" form={form} onFinish={onFinish}>
            <Form.Item
              name="login"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" autoComplete="username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={classes.submitBtn}>
                Sign in
              </Button>
            </Form.Item>
            Or <a href="">register now!</a>
          </Form>
        )}
      </div>
    </>
  );
};

export default SignIn;
