import classNames from 'classnames/bind';
import ChargeAmount from '@/components/page/accountCharge/chargeAmount/ChargeAmount';
import Payment from '@/components/page/accountCharge/payment/Payment';
import TotalAmount from '@/components/page/accountCharge/totalAmount/TotalAmount';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import { ChargeContainer } from '@/context/ChargeContext';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargePage = () => {
  return (
    <ChargeContainer>
      <div className={cx('container')}>
        <PageHeader label="충전 하기" />
        <ChargeAmount />
        <Divider />
        <Payment />
        <Divider />
        <TotalAmount />
      </div>
    </ChargeContainer>
  );
};

export default AccountChargePage;
