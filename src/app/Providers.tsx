import { BrowserRouter } from 'react-router-dom';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

export type Props = {
  children: React.ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};
