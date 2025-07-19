import classNames from 'classnames/bind';
import { type IconNameType, icons } from '@/assets/icons/icon';
import styles from './icon.module.scss';

type IconSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type IconColorType = 'primary' | 'secondary' | 'white';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: IconSizeType;
  color?: IconColorType;
  name: IconNameType;
}

const cx = classNames.bind(styles);

const Icon = ({
  size = 'sm',
  color = 'primary',
  name,
  className,
  ...props
}: IconProps) => {
  const IconElement = icons[name];
  const sizeMap = {
    xs: 10,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    xxl: 60,
  };

  const colorMap = {
    primary: 'var(--theme-blue400)',
    secondary: 'var(--theme-gray600)',
    white: 'var(--theme-white)',
  };

  return (
    <div className={cx(['wrapper', className])} {...props}>
      <IconElement
        fill={colorMap[color]}
        width={sizeMap[size]}
        height={sizeMap[size]}
      />
    </div>
  );
};

export default Icon;
