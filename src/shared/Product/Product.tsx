import { FC } from 'react';
import s from './Product.module.sass';
import { AddToCart } from '../../features/AddToCart';
import { useSelector } from 'react-redux';
import { selectCart } from './../../store/slices/cartSlice';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductProps {
  id: string;
  photo?: string;
  name: string;
  description: string;
  price: number;
}

export const Product: FC<ProductProps> = ({
  id,
  photo,
  name,
  description,
  price,
}) => {
  const cartItems = useSelector(selectCart);
  const item = cartItems.find((item) => item.id === id);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => {
    navigate('/product/' + id, { state: { background: location } });
  };

  return (
    <div className={s.product}>
      <div className={s.photo}>
        <img src={photo} alt={name} />
      </div>
      <div className={s.title}>{name}</div>
      <div className={s.description}>{description}</div>
      <div className={s.price}>{price} руб.</div>
      <AddToCart id={id} count={item?.quantity ?? 0} disabled={false} />
      <button onClick={handleOpen}>🖊️</button>
    </div>
  );
};
