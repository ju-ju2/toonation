import { useFormContext } from 'react-hook-form';
import classNames from 'classnames/bind';
import Button from '@/components/ui/button/Button';
import Content from '@/components/ui/content/Content';
import ChargeInput from '@/components/ui/input/chargeInput/ChargeInput';
import Text from '@/components/ui/text/Text';
import { CHARGE, CHARGE_AMOUNT_MAP } from '@/constants/accountCharge';
import type { ChargeCardFormType } from '@/pages/account/charge';
import { formatNumber } from '@/utils/utils';
import styles from './chargeAmount.module.scss';

const cx = classNames.bind(styles);

const ChargeAmount = () => {
  const { watch, setValue, reset } = useFormContext<ChargeCardFormType>();

  const amount = watch('amount');

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value.replace(/[^0-9]/g, ''));
    setValue('amount', numericValue);
  };

  const handleAddCharge = (add: number) => {
    setValue('amount', amount + add);
  };

  const handleReset = () => {
    reset({ amount: 0, paymentType: 'DOMESTIC' });
  };

  return (
    <Content title={CHARGE.TITLE}>
      <div className={cx('content_wrapper')}>
        <ChargeInput
          label="캐시"
          placeholder="금액을 입력하세요"
          value={formatNumber(amount)}
          onChange={handleChangeAmount}
          onReset={handleReset}
        />
        <div className={cx('buttons_wrapper')}>
          {Object.values(CHARGE_AMOUNT_MAP).map((amount) => (
            <Button
              key={amount}
              label={{
                label: formatNumber(amount),
                type: 'titleSemiBold',
              }}
              variant="secondary"
              icon={{ name: 'Plus', size: 'xs' }}
              onClick={() => handleAddCharge(amount)}
            />
          ))}
        </div>
      </div>
      <Text
        label={CHARGE.CHARGE_AMOUNT}
        type="descriptionMedium"
        color="secondary"
      />
    </Content>
  );
};

export default ChargeAmount;
