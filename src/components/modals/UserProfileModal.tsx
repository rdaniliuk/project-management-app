import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { hideUserProfileModal } from 'store/modalsSlice';
import { clearUserError, getUser, resetUser } from 'store/userSlice';
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
  const { name, login, statusCode, errMsg, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [notify, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<IValues>();

  useEffect(() => {
    if (isUserProfileShown) {
      dispatch(getUser({ id, token }));
    }
  }, [dispatch, id, isUserProfileShown, token]);

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

  const handleBtn = (callback: (values: IValues) => void) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        dispatch(hideUserProfileModal());
        callback(values);
      })
      .catch(() => {
        return;
      });
  };

  const handleOk = () => {
    handleBtn(console.log);
  };

  const handleDelete = () => {
    handleBtn(console.log);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={`User profile`}
        open={isUserProfileShown}
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
          <Form form={form} layout="vertical" name="form_in_modal">
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
              <Input placeholder={'Login'} allowClear />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input type="password" placeholder="Password" autoComplete="current-password" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UserProfileModal;
