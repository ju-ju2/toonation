import classNames from 'classnames/bind';
import Icon from '../icon/Icon';
import styles from './card.module.scss';

const cx = classNames.bind(styles);

interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {}

interface MainProps extends CardBaseProps {
  isMain: true;
  isSelected?: never;
}

interface NonMainProps extends CardBaseProps {
  isMain?: false;
  isSelected?: boolean;
}

type CardProps = MainProps | NonMainProps;

const Card = ({
  isMain,
  isSelected,
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <div className={cx(['wrapper', { main: isMain }, className])} {...props}>
      {!isMain && (
        <div className={cx('icon')}>
          {isSelected ? (
            <Icon name="Check" size="md" />
          ) : (
            <Icon name="CheckEmpty" />
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
