import React, { FC } from 'react';
import s from './Modal.module.sass';
import { createPortal } from 'react-dom';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ visible, onClose, children }) => {
  if (!visible) {
    return null;
  }

  return createPortal(
    <div className={s.root}>
      <div className={s.wrapper} onClick={onClose}></div>
      <div className={s.modal}>
        <button className={s.close} onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>,
    document.querySelector('#modal-root') as Element
  );
};
