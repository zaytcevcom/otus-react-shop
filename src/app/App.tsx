import { useEffect } from 'react';
import './index.css';
import { LocalizationInitiator } from './localization/LocalizationInitiator.tsx';
import { ThemeProvider } from './theming';
import { useDispatch, useSelector } from 'react-redux';
import { init, selectIsInit } from '../store/slices/appSlice.ts';
import { Layout } from '../shared/Layout';
import { Routing } from './Routing';

function App() {
  const dispatch = useDispatch();
  const isInit = useSelector(selectIsInit);

  useEffect(() => {
    if (!isInit) {
      dispatch(init());
    }
  }, [isInit, dispatch]);

  if (!isInit) {
    return <div>Loading...</div>; // Показываем спиннер/загрузку
  }
  return (
    <>
      <LocalizationInitiator />
      <ThemeProvider>
        <Layout>
          <Routing />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
