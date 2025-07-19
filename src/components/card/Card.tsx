import classNames from 'classnames/bind';
import styles from './card.module.scss';

const cx = classNames.bind(styles);

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isMain?: boolean;
}

const Card = ({ isMain, children, className, ...props }: CardProps) => {
  return (
    <div className={cx(['wrapper', { main: isMain }, className])} {...props}>
      {children}
    </div>
  );
};

export default Card;
