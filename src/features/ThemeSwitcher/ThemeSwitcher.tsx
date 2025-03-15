import { FC } from 'react';
import cn from 'clsx';
import s from './ThemeSwitcher.module.sass';
import { Theme, useThemeContext } from '../../app/theming';

export type ThemeSwitcherProps = {
  className?: string;
};

const icons = {
  [Theme.light]: '🌝',
  [Theme.dark]: '🌚',
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      type="button"
      className={cn(s.root, className)}
      onClick={toggleTheme}
    >
      {icons[theme]}
    </button>
  );
};
