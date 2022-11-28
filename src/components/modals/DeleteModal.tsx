import React from 'react';
import 'antd/dist/antd.css';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

interface IHandlers {
  onOk: () => void;
  onCancel: () => void;
}

const callDeleteModal = ({ onOk, onCancel }: IHandlers) => {
  Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleFilled />,
    content: 'Are you sure?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk,
    onCancel,
  });
};

export default callDeleteModal;
