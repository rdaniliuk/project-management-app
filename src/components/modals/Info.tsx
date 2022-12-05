import { Modal } from 'antd';

interface IInfoModal {
  title: string;
  description: string;
  onOk: () => void;
}

const callInfoModal = (task: IInfoModal) => {
  Modal.info({
    title: task.title,
    content: task.description,
    okText: 'Ok',
    onOk: task.onOk,
  });
};

export default callInfoModal;
