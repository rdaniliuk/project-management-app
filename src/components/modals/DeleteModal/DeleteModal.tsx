import React from 'react';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const DeleteModal = () => {
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure?',
    okText: 'Yes',
    cancelText: 'No',
    onOk: () => console.log('ok'),
    onCancel: () => console.log('no'),
  });
};

export default DeleteModal;
