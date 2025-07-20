import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import ChargeAmount from '@/components/page/accountCharge/chargeAmount/ChargeAmount';
import Payment from '@/components/page/accountCharge/payment/Payment';
import TotalAmount from '@/components/page/accountCharge/totalAmount/TotalAmount';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import {
  type AbroadPaymentKey,
  type DomesticPaymentKey,
  PAYMENT_TYPE,
  type PaymentType,
} from '@/constants/accountCharge';
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
    paymentType: PAYMENT_TYPE.DOMESTIC,
  };

  const chargeCardForm = useForm<ChargeCardFormType>({
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    const stored = localStorage.getItem('chargeCardForm');

    if (stored) {
      try {
        const data = JSON.parse(stored);
        const paymentType = data?.paymentType as PaymentType;
        if (paymentType) {
          chargeCardForm.setValue('paymentType', data.paymentType);
          if (paymentType === PAYMENT_TYPE.DOMESTIC) {
            chargeCardForm.setValue('domestic', data.domestic);
          }
          if (paymentType === PAYMENT_TYPE.ABROAD) {
            chargeCardForm.setValue('abroad', data.abroad);
          }
        }
      } catch (e) {
        console.error('로컬스토리지 파싱 실패:', e);
      }
    }
  }, []);
  return (
    <FormProvider {...chargeCardForm}>
      <div className={cx('container')}>
        <PageHeader label="충전하기" />
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
