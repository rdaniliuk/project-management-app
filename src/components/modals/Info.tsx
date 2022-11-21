import { Modal } from 'antd';

interface iInfoModal {
  name: string;
  description: string;
}

const Info = (task: iInfoModal) => {
  Modal.info({
    title: task.name,
    content: task.description,
    okText: 'Ok',
    onOk: () => console.log('ok'),
  });
};

export default Info;
