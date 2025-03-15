import React, { FC } from 'react';
import { Header } from '../Header';
import s from './Layout.module.sass';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <Header />
      {children}
    </div>
  );
};
