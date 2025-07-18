import classNames from 'classnames/bind';
import Icon, { type IconProps } from '../icon/Icon';
import type { TextColorType, TextProps } from '../text/Text';
import Text from '../text/Text';
import styles from './button.module.scss';

type ButtonVariantType = 'primary' | 'secondary';
type ButtonSizeType = 'small' | 'medium' | 'large';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: Pick<TextProps, 'label' | 'type'>;
  variant?: ButtonVariantType;
  icon?: IconProps;
  size?: ButtonSizeType;
}

const cx = classNames.bind(styles);

const Button = ({
  label,
  variant = 'primary',
  icon,
  size = 'medium',
  ...props
}: ButtonProps) => {
  const getButtonColor = (variant: ButtonVariantType): TextColorType => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return 'secondary';
    }
  };

  return (
    <button className={cx(['button', variant, size])} {...props}>
      {icon && <Icon name={icon.name} size={icon.size} color={icon.color} />}
      <Text
        as="span"
        type={label?.type}
        label={label?.label}
        color={getButtonColor(variant)}
      />
    </button>
  );
};

export default Button;
