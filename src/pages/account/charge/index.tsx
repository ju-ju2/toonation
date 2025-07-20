import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import ChargeAmount from '@/components/page/accountCharge/chargeAmount/ChargeAmount';
import Payment from '@/components/page/accountCharge/payment/Payment';
import TotalAmount from '@/components/page/accountCharge/totalAmount/TotalAmount';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import type {
  AbroadPaymentKey,
  DomesticPaymentKey,
  PaymentType,
} from '@/constants/enums';
import styles from './index.module.scss';

export type ChargeCardFormType = {
  amount: number;
  paymentType: PaymentType;
  domestic?: DomesticPaymentKey;
  abroad?: AbroadPaymentKey;
};

const cx = classNames.bind(styles);

const AccountChargePage = () => {
  const defaultValues: ChargeCardFormType = {
    amount: 0,
    paymentType: 'DOMESTIC',
  };

  const chargeCardForm = useForm<ChargeCardFormType>({
    defaultValues: { ...defaultValues },
  });
  return (
    <FormProvider {...chargeCardForm}>
      <div className={cx('container')}>
        <PageHeader label="충전 하기" />
        <ChargeAmount />
        <Divider />
        <Payment />
        <Divider />
        <TotalAmount />
      </div>
    </FormProvider>
  );
};

export default AccountChargePage;
