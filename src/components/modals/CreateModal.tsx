import React from 'react';
import 'antd/dist/antd.css';
import { Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { hideCreateModal, setDescription, setTitle } from 'store/modalsSlice';

const CreateModal = ({ type, onCreate: onCreateCB }: { type: string; onCreate: () => void }) => {
  const { isCreateShown, title, description } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(hideCreateModal());
  };

  const onCreate = () => {
    dispatch(hideCreateModal());
    onCreateCB();
  };

  return (
    <Modal
      title={`Create ${type}`}
      open={isCreateShown}
      onOk={onCreate}
      onCancel={hideModal}
      okText="Create"
      cancelText="Back"
    >
      <Input
        placeholder={`${type} Title`}
        allowClear
        value={title}
        onChange={(e) => {
          dispatch(setTitle(e.target.value));
        }}
      />
      <Input
        placeholder="Description"
        allowClear
        value={description}
        onChange={(e) => {
          dispatch(setDescription(e.target.value));
        }}
      />
    </Modal>
  );
};

export default CreateModal;
