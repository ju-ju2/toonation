import { useEffect, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { usePostChargeCardApi } from '@/api/service/charge.hooks';
import type { PostChargeCardRes } from '@/api/type/apiType';
import Button from '@/components/ui/button/Button';
import Content from '@/components/ui/content/Content';
import Text from '@/components/ui/text/Text';
import { TOTAL_AMOUNT } from '@/constants/accountCharge';
import { ACTION_MESSAGE } from '@/constants/accountChargeCulture';
import { useGlobalContext } from '@/context/GlobalContext';
import type { ChargeCardFormType } from '@/pages/account/charge';
import { PAGE_PATH } from '@/routes';
import { formatNumber } from '@/utils/utils';
import styles from './totalAmount.module.scss';

const cx = classNames.bind(styles);

const TotalAmount = () => {
  const { watch } = useFormContext<ChargeCardFormType>();
  const amount = watch('amount');
  const paymentType = watch('paymentType');
  const domestic = watch('domestic');
  const abroad = watch('abroad');

  const isDomestic = paymentType === 'DOMESTIC';

  const isValidAmount = amount >= 1000;
  const isValidPayment = !!domestic || !!abroad;

  const navigate = useNavigate();
  const { message } = useGlobalContext();
  const { mutate, data, isPending, isSuccess, isError, error } =
    usePostChargeCardApi();
  const userId = useId();

  const handleChargeClick = () => {
    if (paymentType === 'DOMESTIC' && 'CULTURE') {
      navigate(PAGE_PATH.ACCOUNT_CHARGE_CULTURE);
    } else {
      mutate({ isDomestic, amount, userId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message({
        type: 'success',
        title: ACTION_MESSAGE.SUCCESS_CHARGE.TITLE,
        description: ACTION_MESSAGE.SUCCESS_CHARGE.DESCRIPTION,
        key: ACTION_MESSAGE.SUCCESS_CHARGE.TITLE,
      });
      navigate(PAGE_PATH.ACCOUNT_CHARGE_RESULT, {
        state: {
          amount: data.data?.amount,
          totalAmount: data.data?.totalAmount,
        } as PostChargeCardRes,
      });
      localStorage.setItem(
        'chargeCardForm',
        JSON.stringify({
          paymentType: paymentType,
          domestic: isDomestic ? domestic : undefined,
          abroad: isDomestic ? undefined : abroad,
        } as ChargeCardFormType)
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      message({
        type: 'error',
        title: error?.name,
        description: error?.message,
        key: error?.name,
      });
    }
  }, [isError]);

  return (
    <Content
      title={TOTAL_AMOUNT.TITLE}
      extra={
        <Text label={`${formatNumber(amount) || 0}원`} type="headlineBold" />
      }
    >
      <div className={cx('description_wrapper')}>
        {TOTAL_AMOUNT.DESCRIPTION.map((item, idx) => (
          <Text
            key={idx}
            label={item}
            type="descriptionMedium"
            color="secondary"
          />
        ))}
      </div>
      <Button
        label={{ label: TOTAL_AMOUNT.BUTTON_LABEL }}
        onClick={handleChargeClick}
        disabled={!isValidPayment || !isValidAmount || isPending}
        icon={
          isPending
            ? { name: 'Spinner', size: 'lg', color: 'white' }
            : undefined
        }
      />
    </Content>
  );
};

export default TotalAmount;
