import { useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { usePostChargeCardApi } from '@/api/service/charge.hooks';
import type { PostChargeCardRes } from '@/api/type/apiType';
import Button from '@/components/ui/button/Button';
import Content from '@/components/ui/content/Content';
import Text from '@/components/ui/text/Text';
import { ACTION_MESSAGE } from '@/constants/accountChargeCulture';
import { TOTAL_AMOUNT } from '@/constants/enums';
import { useCharge } from '@/context/ChargeContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { PAGE_PATH } from '@/routes';
import { formatNumber } from '@/utils/utils';
import styles from './totalAmount.module.scss';

const cx = classNames.bind(styles);

const TotalAmount = () => {
  const { amount, payment } = useCharge();
  const isDomestic = payment?.domestic !== undefined;
  const isAbroad = payment?.abroad !== undefined;
  const isValidAmount = amount > 1000;
  const disabled = !(isDomestic || isAbroad) || !isValidAmount;

  const navigate = useNavigate();
  const { message } = useGlobalContext();
  const { mutate, data, isPending, isSuccess, isError, error } =
    usePostChargeCardApi();
  const userId = useId();

  const handleChargeClick = () => {
    if (payment.domestic === 'CULTURE') {
      navigate(PAGE_PATH.ACCOUNT_CHARGE_CULTURE);
    } else {
      mutate({ isDomestic, amount, userId });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message({
        type: 'success',
        title: ACTION_MESSAGE.SUCCESS_BASIC.TITLE,
        description: ACTION_MESSAGE.SUCCESS_BASIC.DESCRIPTION,
        key: ACTION_MESSAGE.SUCCESS_BASIC.TITLE,
      });
      navigate(PAGE_PATH.ACCOUNT_CHARGE_RESULT, {
        state: {
          amount: data.data?.amount,
          totalAmount: data.data?.totalAmount,
        } as PostChargeCardRes,
      });
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
        disabled={disabled || isPending}
        icon={
          isPending
            ? { name: 'Loading', size: 'lg', color: 'white' }
            : undefined
        }
      />
    </Content>
  );
};

export default TotalAmount;
