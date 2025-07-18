import classNames from 'classnames/bind';
import PageHeader from '@/components/pageHeader/PageHeader';
import ChargeAmount from './chargeAmount/ChargeAmount';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargePage = () => {
  return (
    <div className={cx('container')}>
      <PageHeader label="충전하기" />
      <ChargeAmount />
    </div>
  );
};

export default AccountChargePage;
