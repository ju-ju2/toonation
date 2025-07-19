import ArrowLeft from './svg/arrowLeft.svg?react';
import ArrowRight from './svg/arrowRight.svg?react';
import Check from './svg/check.svg?react';
import CheckEmpty from './svg/checkEmpty.svg?react';
import Plus from './svg/plus.svg?react';
import PlusBackground from './svg/plusBackground.svg?react';
import X from './svg/x.svg?react';

export const icons = {
  Plus,
  PlusBackground,
  X,
  Check,
  CheckEmpty,
  ArrowLeft,
  ArrowRight,
};

export type IconNameType = keyof typeof icons;
