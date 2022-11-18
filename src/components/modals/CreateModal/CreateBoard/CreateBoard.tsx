import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Modal } from 'antd';

const CreateBoard = () => {
  const [open, setOpen] = useState(false);
  const [nameBoardValue, setNameBoardValue] = useState('');
  const [descriptionBoardValue, setDescriptionBoardValue] = useState('');

  const showModal = () => {
    setNameBoardValue('');
    setDescriptionBoardValue('');
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
      title="Create Board"
      open={open}
      onOk={onCreate}
      onCancel={hideModal}
      okText="Create"
      cancelText="Back"
    >
      <Input
        placeholder="Board Name"
        allowClear
        value={nameBoardValue}
        onChange={(e) => {
          setNameBoardValue(e.target.value);
        }}
      />
      <Input
        placeholder="Description"
        allowClear
        value={descriptionBoardValue}
        onChange={(e) => {
          setDescriptionBoardValue(e.target.value);
        }}
      />
    </Modal>
  );
};

export default CreateBoard;
