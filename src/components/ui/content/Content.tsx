import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './content.module.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  extra?: React.ReactNode;
}

const cx = classNames.bind(styles);

const Content = ({
  title,
  extra,
  children,
  className,
  ...props
}: ContentProps) => {
  return (
    <div className={cx(['wrapper', className])} {...props}>
      {(title || extra) && (
        <div className={cx('header')}>
          {title && <Text label={title} type="titleSemiBold" />}
          {extra}
        </div>
      )}
      {children}
    </div>
  );
};

export default Content;
