import { FC } from 'react';
import s from './LoadMoreButton.module.sass';

interface LoadMoreProps {
  label: string;
  onClick: () => void;
}

export const LoadMoreButton: FC<LoadMoreProps> = ({ label, onClick }) => {
  return (
    <button className={s.root} type="button" onClick={onClick}>
      {label}
    </button>
  );
};
