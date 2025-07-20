import classNames from 'classnames/bind';
import Button from '../button/Button';
import Text from '../text/Text';
import styles from './fallback.module.scss';

const cx = classNames.bind(styles);

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div role="alert" className={cx('container')}>
      <p className={cx('error')}>ERROR!</p>
      <Text
        className={cx('title')}
        as="h1"
        label="문제가 발생했습니다"
        type="headlineBold"
      />
      <Text
        className={cx('text')}
        as="h2"
        label={error.message}
        type="titleSemiBold"
      />
      <Button
        className={cx(['button', 'error'])}
        label={{ label: '다시 시도' }}
        onClick={resetErrorBoundary}
      />
    </div>
  );
};

export default ErrorFallback;
