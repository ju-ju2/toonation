import classNames from 'classnames/bind';
import Icon, { type IconProps } from '../icon/Icon';
import type { TextColorType, TextProps } from '../text/Text';
import Text from '../text/Text';
import styles from './button.module.scss';

type VariantType = 'primary' | 'secondary';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: Pick<TextProps, 'label' | 'type'>;
  variant?: VariantType;
  icon?: IconProps;
}

const cx = classNames.bind(styles);

const Button = ({
  label,
  variant = 'primary',
  icon,
  ...props
}: ButtonProps) => {
  const getButtonColor = (variant: VariantType): TextColorType => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'secondary':
        return 'secondary';
    }
  };

  return (
    <button className={cx(['button', variant])} {...props}>
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
