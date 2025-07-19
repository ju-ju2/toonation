import Plus from './svg/plus.svg?react';
import PlusBackground from './svg/plusBackground.svg?react';
import X from './svg/x.svg?react';

export const icons = {
  Plus,
  PlusBackground,
  X,
};

export type IconNameType = keyof typeof icons;
