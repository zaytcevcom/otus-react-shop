import { FC } from 'react';
import { Product as ProductEntity } from './../../entities/Product';
import { Product } from '../../shared/Product';
import s from './ProductList.module.sass';

interface ProductListProps {
  products: ProductEntity[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className={s.root}>
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.desc || ''}
          price={product.price}
          photo={product.photo}
        />
      ))}
    </div>
  );
};
