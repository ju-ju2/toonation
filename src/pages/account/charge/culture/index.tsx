import classNames from 'classnames/bind';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargeCulturePage = () => {
  return (
    <div className={cx('container')}>
      <PageHeader label="문화상품권 충전" />
    </div>
  );
};

export default AccountChargeCulturePage;
