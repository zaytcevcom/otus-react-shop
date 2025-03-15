import { ProductsPage } from './../../pages/ProductsPage/ProductsPage';
import { ProfilePage } from './../../pages/ProfilePage/ProfilePage';
import { CartPage } from './../../pages/CartPage/CartPage';
import { LoginPage } from './../../pages/LoginPage/LoginPage';
import { FC } from 'react';
import { ProfileState } from './../../store/slices/authSlice';
import { ProductForm } from '../../widgets/ProductForm';
import { SignupPage } from './../../pages/SignupPage/SignupPage';

type RouteType = {
  path: string;
  url: string;
  element: FC;
  title: string;
  isVisible: (user?: ProfileState) => boolean;
  isModal: boolean;
};

const isGuest = (user?: ProfileState) => !user;
const isUser = (user?: ProfileState) => !!user;
const isAdmin = (user?: ProfileState) => !!(user && user.role === 'admin');

export const routes: RouteType[] = [
  {
    path: '/',
    url: '/',
    element: ProductsPage,
    title: 'components.Header.products',
    isVisible: () => true,
    isModal: false,
  },
  {
    path: '/profile',
    url: '/profile',
    element: ProfilePage,
    title: 'components.Header.profile',
    isVisible: isUser,
    isModal: false,
  },
  {
    path: '/cart',
    url: '/cart',
    element: CartPage,
    title: 'components.Header.cart',
    isVisible: () => true,
    isModal: false,
  },
  {
    path: '/login',
    url: '/login',
    element: LoginPage,
    title: 'components.Header.login',
    isVisible: isGuest,
    isModal: false,
  },
  {
    path: '/signup',
    url: '/signup',
    element: SignupPage,
    title: 'components.Header.signup',
    isVisible: isGuest,
    isModal: false,
  },
  {
    path: '/product/:id?',
    url: '/product',
    element: ProductForm,
    title: 'components.Header.product_new',
    isVisible: isAdmin,
    isModal: true,
  },
];
