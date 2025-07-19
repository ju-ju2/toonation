import classNames from 'classnames/bind';
import styles from './text.module.scss';

type TextStyleType =
  | 'headlineBold'
  | 'titleSemiBold'
  | 'bodyMedium'
  | 'descriptionMedium';

type VariantType = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TextColorType = 'default' | 'primary' | 'secondary' | 'white';

export interface TextProps {
  type?: TextStyleType;
  color?: TextColorType;
  as?: VariantType;
  label: string;
  className?: string;
}
const cx = classNames.bind(styles);

const Text = ({
  type = 'titleSemiBold',
  color = 'default',
  as = 'p',
  label,
  className,
}: TextProps) => {
  const Component = as;

  return (
    <Component className={cx(['text', color, type, className])}>
      {label}
    </Component>
  );
};

export default Text;
