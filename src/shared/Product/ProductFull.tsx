import { FC } from 'react';
import s from './Product.module.sass';
import { AddToCart } from '../../features/AddToCart';

interface ProductFullProps {
  id: string;
  photo?: string;
  category: string;
  name: string;
  description: string;
  price: number;
}

export const ProductFull: FC<ProductFullProps> = ({
  id,
  photo,
  name,
  category,
  description,
  price,
}) => {
  return (
    <div className={s.product_full}>
      <div>
        <div className={s.photo}>
          <img src={photo} alt={name} />
        </div>
      </div>
      <div>
        <div className={s.title}>
          {name} ({category})
        </div>
        <div className={s.description}>{description}</div>
        <div className={s.price}>{price} руб.</div>
        <AddToCart id={id} count={0} disabled={true} />
      </div>
    </div>
  );
};
