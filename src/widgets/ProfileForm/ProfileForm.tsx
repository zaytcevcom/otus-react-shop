import { FC } from 'react';
import s from './ProfileForm.module.sass';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { selectProfile } from './../../store/slices/authSlice';

type formProps = {
  username: string;
  about?: string;
};

export const ProfileForm: FC = () => {
  const profile = useSelector(selectProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: profile?.username || '',
      about: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: formProps) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.root}>
      <h2>Профиль</h2>
      <input
        type="text"
        placeholder={t`forms.ProfileForm.username.placeholder`}
        {...register('username', {
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
      {errors.username && <p>{errors.username.message}</p>}

      <textarea
        placeholder={t`forms.ProfileForm.about.placeholder`}
        {...register('about', {
          required: false,
          maxLength: {
            value: 500,
            message: t`limits.maxLength500`,
          },
        })}
      />
      {errors.about && <p>{errors.about.message}</p>}

      <button type={'submit'}>{t`buttons.save`}</button>
    </form>
  );
};
