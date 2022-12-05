import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { hideUserProfileModal } from 'store/modalsSlice';
import {
  clearIsSuccessful,
  clearUserError,
  deleteUser,
  getUser,
  putUser,
  resetUser,
} from 'store/userSlice';
import { notification } from 'antd';
import Loader from 'components/Loader/Loader';
import { authErr, resetAuth } from 'store/authSlice';

interface IValues {
  name: string;
  login: string;
  password: string;
}

const UserProfileModal = () => {
  const { isUserProfileShown } = useAppSelector((state) => state.modals);
  const { id, token } = useAppSelector((state) => state.auth);
  const { name, login, statusCode, errMsg, isLoading, isSuccessful, isDeleted } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<IValues>();

  useEffect(() => {
    if (isUserProfileShown) {
      dispatch(getUser({ id, token }));
    }
  }, [dispatch, id, isUserProfileShown, token]);

  useEffect(() => {
    if (!isLoading) {
      form.resetFields();
    }
  }, [form, isLoading]);

  useEffect(() => {
    if (statusCode && authErr.includes(+statusCode)) {
      dispatch(resetAuth());
      dispatch(resetUser());
      return;
    }
    if (errMsg) {
      notify['error']({
        message: 'Error',
        description: errMsg,
      });
      dispatch(clearUserError());
    }
  }, [dispatch, errMsg, notify, statusCode]);

  const hideModal = () => {
    dispatch(hideUserProfileModal());
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        dispatch(putUser({ id, token, user: values }));
      })
      .catch(() => {
        return;
      });
  };

  useEffect(() => {
    if (isSuccessful) {
      hideModal();
      dispatch(clearIsSuccessful());
    }
  });

  const handleDelete = () => {
    dispatch(deleteUser({ id, token }));
  };

  useEffect(() => {
    if (isDeleted) {
      hideModal();
      dispatch(resetAuth());
      dispatch(resetUser());
    }
  });

  return (
    <>
      {contextHolder}
      <Modal
        forceRender
        title={`User profile`}
        open={isUserProfileShown}
        onCancel={hideModal}
        footer={[
          <Button key="delete" onClick={handleDelete} loading={isLoading}>
            Delete
          </Button>,
          <Button key="cancel" type="primary" onClick={hideModal} loading={isLoading}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk} loading={isLoading}>
            Ok
          </Button>,
        ]}
      >
        {isLoading && <Loader />}
        {!isLoading && (
          <Form form={form} layout="vertical" name="user-profile">
            <Form.Item
              name="name"
              label="Name"
              initialValue={name}
              rules={[{ required: true, message: 'should not be empty' }]}
            >
              <Input placeholder={'Name'} allowClear />
            </Form.Item>
            <Form.Item
              name="login"
              label="Login"
              initialValue={login}
              rules={[{ required: true, message: 'should not be empty' }]}
            >
              <Input placeholder={'Login'} autoComplete="username" allowClear />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your Password!' },
                { min: 8, message: 'Must be at least 8 symbols' },
                { pattern: /^[0-9a-zA-Z]+$/, message: 'letters and numbers only!' },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm password"
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
              <Input
                type="password"
                placeholder="Confirm password"
                autoComplete="new-password"
                allowClear
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UserProfileModal;
