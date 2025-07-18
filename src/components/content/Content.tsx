import classNames from 'classnames/bind';
import styles from './content.module.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const cx = classNames.bind(styles);

const Content = ({ children, className, ...props }: ContentProps) => {
  return (
    <div className={cx(['wrapper', className])} {...props}>
      {children}
    </div>
  );
};

export default Content;
