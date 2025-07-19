import { type IconNameType, icons } from '@/assets/icons/icon';

type IconSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type IconColorType = 'primary' | 'secondary' | 'white';

export interface IconProps {
  size?: IconSizeType;
  color?: IconColorType;
  name: IconNameType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Icon = ({ size = 'sm', color = 'primary', name, onClick }: IconProps) => {
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px',
      }}
      onClick={onClick}
    >
      <IconElement
        fill={colorMap[color]}
        width={sizeMap[size]}
        height={sizeMap[size]}
      />
    </div>
  );
};

export default Icon;
