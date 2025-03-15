import { FC, useState } from 'react';
import s from './SignupForm.module.sass';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import { login, ProfileState } from './../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { instance } from './../../shared/api/base/instance';

type formProps = {
  email: string;
  password: string;
};

export const SignupForm: FC = () => {
  const { register, handleSubmit } = useForm<formProps>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: formProps) => {
    try {
      const response = await instance.post('signup', data);

      const profile: ProfileState = {
        username: response.data.profile.email,
        role: 'user',
      };

      dispatch(login({ token: response.data.token, profile: profile }));

      navigate('/profile');
    } catch (error) {
      let message = null;
      const errors = (error as any).response?.data?.errors || [];

      if (errors.length > 0) {
        message = errors[0]?.message;
      }

      setError(message || 'Unknown error. Please try again');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
        <h2>Регистрация</h2>
        <input
          type="text"
          placeholder={t`forms.SignupForm.email.placeholder`}
          {...register('email')}
        />
        <input
          type="text"
          placeholder={t`forms.SignupForm.password.placeholder`}
          {...register('password')}
        />
        {error && <div className={s.error}>{error}</div>}
        <button type={'submit'}>{t`forms.SignupForm.submit`}</button>
      </form>
    </>
  );
};
