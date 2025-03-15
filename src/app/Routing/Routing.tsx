import { FC } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../widgets/Modal';
import { routes } from './routes.ts';
import { ProductsPage } from '../../pages/ProductsPage/ProductsPage';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/slices/authSlice';

export const Routing: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background as unknown;
  const profile = useSelector(selectProfile);

  return (
    <>
      <Routes location={background || location}>
        {routes
          .filter((route) => !route.isModal && route.isVisible(profile))
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        <Route path="*" element={<ProductsPage />} />
      </Routes>
      {background && (
        <Modal visible={true} onClose={() => navigate(-1)}>
          <Routes>
            {routes
              .filter((route) => route.isModal && route.isVisible(profile))
              .map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
          </Routes>
        </Modal>
      )}
    </>
  );
};
