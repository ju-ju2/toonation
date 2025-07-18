import classNames from 'classnames/bind';
import styles from './text.module.scss';

type TextStyleType =
  | 'headlineBold'
  | 'titleSemiBold'
  | 'bodyMedium'
  | 'descriptionMedium';

type VariantType = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TextProps {
  type?: TextStyleType;
  color?: 'default' | 'primary' | 'secondary';
  as?: VariantType;
  label: string;
}
const cx = classNames.bind(styles);

const Text = ({
  type = 'bodyMedium',
  color = 'default',
  as = 'p',
  label,
}: TextProps) => {
  const Component = as;

  return <Component className={cx([color, type])}>{label}</Component>;
};

export default Text;
