import { FC, useEffect } from 'react';
import s from './LoginForm.module.sass';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { login, ProfileState } from './../..//store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from './../../store/api/authApi';

type formProps = {
  email: string;
  password: string;
};

type ApiError = {
  data: {
    errors: {
      message: string;
    }[];
  };
};

export const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin, { data, error, isLoading, isSuccess }] = useSigninMutation();

  const onSubmit = async (data: formProps) => {
    await signin(data);
  };

  useEffect(() => {
    if (isSuccess) {
      const profile: ProfileState = {
        username: data.profile.email,
        role: 'admin',
      };

      dispatch(login({ token: data.token, profile: profile }));

      navigate('/profile');
      return;
    } else {
      reset();
    }
  }, [data, dispatch, isSuccess, navigate, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
        <h2>Вход</h2>
        <input
          type="text"
          placeholder={t`forms.LoginForm.email.placeholder`}
          {...register('email', {
            required: t`errors.is_required`,
            validate: (value) =>
              validator.isEmail(value) || t`errors.invalid_email_address`,
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="text"
          placeholder={t`forms.LoginForm.password.placeholder`}
          {...register('password', {
            required: t`errors.is_required`,
            minLength: {
              value: 3,
              message: t`errors.too_short_password`,
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        {error && (
          <div className={s.error}>
            {(error as ApiError).data.errors[0].message}
          </div>
        )}

        <button
          type={'submit'}
          disabled={isLoading}
        >{t`forms.LoginForm.submit`}</button>
      </form>
    </>
  );
};
