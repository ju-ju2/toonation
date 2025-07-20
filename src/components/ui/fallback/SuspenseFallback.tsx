import classNames from 'classnames/bind';
import Icon from '../icon/Icon';
import styles from './fallback.module.scss';

const cx = classNames.bind(styles);

const SuspenseFallback = () => {
  return (
    <div className={cx('container')} aria-label="로딩중" role="status">
      <Icon name="Loading" size="xxl" />
    </div>
  );
};

export default SuspenseFallback;
