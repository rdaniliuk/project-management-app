import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import classes from './SignUp.module.css';
import { ISignUpOpt, signUp } from 'store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useForm } from 'antd/es/form/Form';

const SignUp = () => {
  const [form] = useForm<ISignUpOpt>();
  const { isLogged, isLoading, errMsg } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [notify, contextHolder] = notification.useNotification();

  const onFinish = ({ name, login, password }: ISignUpOpt) => {
    dispatch(signUp({ name, login, password }));
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
          <Form name="sign-up" form={form} onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please input your Name!', whitespace: true },
                { pattern: /^[ a-zA-Z]+$/, message: 'letters and spaces only!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="login"
              rules={[
                { required: true, message: 'Please input your Username!' },
                { pattern: /^[0-9a-zA-Z]+$/, message: 'letters and numbers only!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
                { min: 8, message: 'Must be at least 8 symbols' },
                { pattern: /^[0-9a-zA-Z]+$/, message: 'letters and numbers only!' },
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your Password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Confirm password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={classes.submitBtn}>
                Sign up
              </Button>
            </Form.Item>
            Or <Link to="/auth">login now!</Link>
          </Form>
        )}
      </div>
    </>
  );
};

export default SignUp;
