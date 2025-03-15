import { FC } from 'react';
import s from './Logo.module.sass';
import { useTranslation } from 'react-i18next';

export const Logo: FC = () => {
  const { t } = useTranslation();

  return <div className={s.root}>{t`components.Logo.text`}</div>;
};
