import { FC, useCallback, useState } from 'react';
import { ProductList } from '../../widgets/ProductList';
import { LoadMoreButton } from '../../shared/LoadMoreButton';
import { useDispatch, useSelector } from 'react-redux';
import { loadMore, selectProducts } from './../../store/slices/productsSlice';
import { ProductsApi } from './../../shared/api/product/productsApi';

export const ProductsPage: FC = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    if (isLoading) {
      return;
    }

    fetchData();
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);

    ProductsApi.get(page, 20).then((products) => {
      dispatch(loadMore(products));
      setIsLoading(false);
      setPage(page + 1);
    });
  }, [dispatch, page]);

  return (
    <>
      <ProductList products={products} />
      <LoadMoreButton onChange={handleLoadMore} />
    </>
  );
};
