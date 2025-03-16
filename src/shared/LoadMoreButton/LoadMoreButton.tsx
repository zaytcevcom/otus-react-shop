import { FC } from 'react';
import s from './LoadMoreButton.module.sass';
import { useInView } from 'react-intersection-observer';

interface LoadMoreProps {
  onChange: () => void;
}

export const LoadMoreButton: FC<LoadMoreProps> = ({ onChange }) => {
  const { ref } = useInView({
    onChange: () => onChange(),
  });

  return <div ref={ref} className={s.root}></div>;
};
