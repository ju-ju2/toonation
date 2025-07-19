import classNames from 'classnames/bind';
import Icon, { type IconProps } from '../icon/Icon';
import type { TextColorType, TextProps } from '../text/Text';
import Text from '../text/Text';
import styles from './button.module.scss';

type ButtonVariantType = 'primary' | 'secondary';
type ButtonSizeType = 'small' | 'medium' | 'large';

interface ButtonBaseProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: Pick<TextProps, 'label' | 'type'>;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  direction?: 'row' | 'column';
  selected?: boolean;
}

interface IconOlyProps extends ButtonBaseProps {
  icon: IconProps;
  image?: never;
}

interface ImageOnlyProps extends ButtonBaseProps {
  icon?: never;
  image: { src: string; alt?: string };
}

type ButtonProps = IconOlyProps | ImageOnlyProps;

const cx = classNames.bind(styles);

const Button = ({
  label,
  variant = 'primary',
  icon,
  image,
  size = 'medium',
  direction,
  selected = false,
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
    <button
      className={cx([
        'button',
        variant,
        size,
        direction,
        { selected: selected ? 'selected' : undefined },
      ])}
      {...props}
    >
      {image && <img src={image.src} alt={image.alt} />}
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
