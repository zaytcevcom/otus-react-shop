import { FC, useState } from 'react';
import { Modal } from './Modal';

export const ModalWithInput: FC = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        {value}
      </Modal>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => setVisible(!visible)}>Open modal</button>
    </div>
  );
};
