import classNames from 'classnames/bind';
import PageHeader from '@/components/pageHeader/PageHeader';
import { ChargeContainer } from '@/context/chargeContext';
import ChargeAmount from './chargeAmount/ChargeAmount';
import styles from './index.module.scss';
import Payment from './payment/Payment';
import TotalAmount from './totalAmount/TotalAmount';

const cx = classNames.bind(styles);

const AccountChargePage = () => {
  return (
    <ChargeContainer>
      <div className={cx('container')}>
        <PageHeader label="충전하기" />
        <ChargeAmount />
        <Payment />
        <TotalAmount />
      </div>
    </ChargeContainer>
  );
};

export default AccountChargePage;
