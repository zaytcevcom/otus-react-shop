import { FC, useEffect, useState } from 'react';
import s from './ProductForm.module.sass';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { addProduct, editProduct } from './../../store/slices/productsSlice';
import { ProductsApi } from './../../shared/api/product/productsApi';
import { useParams } from 'react-router-dom';

type formProps = {
  name: string;
  description: string;
  price: string;
  photo?: string;
};

export const ProductForm: FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('Продукт');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      photo: '',
    },
    mode: 'onChange',
  });

  const params = useParams();
  const productId = params.id as string;

  useEffect(() => {
    if (productId) {
      const fetch = async () => {
        const product = await ProductsApi.getById(productId);
        setTitle('Редактирование «' + product.name + '»');
        setValue('name', product.name);
        setValue('photo', product.photo || '');
        setValue('description', product.desc || '');
        setValue('price', product.price.toString());
      };

      fetch().then();
    }
  }, [productId, setValue]);

  const onSubmitCreate = async (data: formProps) => {
    try {
      const productResponse = await ProductsApi.create({
        name: data.name,
        photo: data.photo,
        desc: data.description,
        oldPrice: null,
        price: parseFloat(data.price),
        categoryId: '664a53502c598d193429acf8',
      });

      dispatch(addProduct(productResponse));
      reset();
    } catch (error) {
      let message = null;
      const errors = (error as any).response?.data?.errors || [];

      if (errors.length > 0) {
        message = errors[0]?.message;
      }
      alert(message);
    }
  };

  const onSubmitUpdate = async (data: formProps) => {
    try {
      const productResponse = await ProductsApi.update(productId, {
        name: data.name,
        photo: data.photo,
        desc: data.description,
        oldPrice: null,
        price: parseFloat(data.price),
        categoryId: '664a53502c598d193429acf8',
      });

      dispatch(editProduct({ ...productResponse, id: productId }));
      alert('Изменения успешно сохранены!');
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
    <form
      onSubmit={handleSubmit(productId ? onSubmitUpdate : onSubmitCreate)}
      className={s.root}
    >
      <h2>{title}</h2>
      <input
        type="text"
        placeholder={t`forms.ProductForm.name.placeholder`}
        {...register('name', {
          required: t`errors.is_required`,
          minLength: {
            value: 4,
            message: t`limits.minLength4`,
          },
          maxLength: {
            value: 32,
            message: t`limits.maxLength32`,
          },
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      <textarea
        placeholder={t`forms.ProductForm.description.placeholder`}
        {...register('description', {
          required: false,
          maxLength: {
            value: 500,
            message: t`limits.maxLength500`,
          },
        })}
      />
      {errors.description && <p>{errors.description.message}</p>}

      <input
        type="number"
        placeholder={t`forms.ProductForm.price.placeholder`}
        min={0}
        {...register('price', {
          required: t`errors.is_required`,
        })}
      />
      {errors.price && <p>{errors.price.message}</p>}

      <input
        type="text"
        placeholder={t`forms.ProductForm.photo.placeholder`}
        {...register('photo')}
      />

      <button type={'submit'}>{t`buttons.save`}</button>
    </form>
  );
};
