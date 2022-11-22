import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Modal } from 'antd';

const Create = (type: string) => {
  const [open, setOpen] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const showModal = () => {
    setNameValue('');
    setDescriptionValue('');
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onCreate = () => {
    hideModal();
  };

  return (
    <Modal
      title={`Create ${type}`}
      open={open}
      onOk={onCreate}
      onCancel={hideModal}
      okText="Create"
      cancelText="Back"
    >
      <Input
        placeholder={`${type} Name`}
        allowClear
        value={nameValue}
        onChange={(e) => {
          setNameValue(e.target.value);
        }}
      />
      <Input
        placeholder="Description"
        allowClear
        value={descriptionValue}
        onChange={(e) => {
          setDescriptionValue(e.target.value);
        }}
      />
    </Modal>
  );
};

export default Create;
