import { FC } from 'react';
import { ProductList } from '../../widgets/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from './../../store/slices/productsSlice';
import { clearCart, selectCart } from './../../store/slices/cartSlice';
import { useTranslation } from 'react-i18next';
import { OrdersApi } from './../../shared/api/orders/ordersApi';

export const CartPage: FC = () => {
  const { t } = useTranslation();
  const allProducts = useSelector(selectProducts);
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();

  const products = cartItems
    .map((item) => {
      return allProducts.find((product) => product.id === item.id);
    })
    .filter((product) => product !== undefined);

  if (products.length === 0) {
    return <div>{t`pages.CartPage.emptyList`}</div>;
  }

  const handleCreate = async () => {
    try {
      const order = await OrdersApi.create({ products: cartItems });
      dispatch(clearCart());
      alert('Заказ #' + order.id + ' успешно оформлен!');
    } catch (error) {
      let message = null;
      const errors = (error as any).response?.data?.errors || [];

      if (errors.length > 0) {
        message = errors[0]?.message;
      }
      alert(message);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleCreate}>Оформить заказ</button>
      </div>
      <ProductList products={products} />
    </>
  );
};
