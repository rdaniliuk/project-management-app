import React from 'react';
import 'antd/dist/antd.css';
import { ExclamationCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const DeleteModal = () => {
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleFilled />,
    content: 'Are you sure?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: () => console.log('ok'),
    onCancel: () => console.log('no'),
  });
};

export default DeleteModal;
