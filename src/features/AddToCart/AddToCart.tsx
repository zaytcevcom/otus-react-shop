import { FC } from 'react';
import s from './AddToCart.module.sass';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from './../../store/slices/cartSlice';

interface AddToCartProps {
  id: string;
  count: number;
  disabled: boolean;
}

export const AddToCart: FC<AddToCartProps> = ({ id, count, disabled }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddToCart = (id: string) => {
    dispatch(addToCart(id));
  };

  const handleRemoveFromToCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (count === 0) {
    return (
      <button
        className={s.button}
        disabled={disabled}
        onClick={() => handleAddToCart(id)}
      >{t`components.AddToCart.text`}</button>
    );
  }

  return (
    <div>
      <button
        className={s.button}
        disabled={disabled}
        onClick={() => handleRemoveFromToCart(id)}
      >
        -
      </button>
      {count} шт.
      <button
        className={s.button}
        disabled={disabled}
        onClick={() => handleAddToCart(id)}
      >
        +
      </button>
    </div>
  );
};
