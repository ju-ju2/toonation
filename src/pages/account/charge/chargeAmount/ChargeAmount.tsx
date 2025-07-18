import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '@/components/button/Button';
import Content from '@/components/content/Content';
import Input from '@/components/input/Input';
import Text from '@/components/text/Text';
import { CHARGE, CHARGE_AMOUNT_MAP } from '@/constants/enums';
import { formatNumber } from '@/utils/utils';
import styles from './chargeAmount.module.scss';

const cx = classNames.bind(styles);

const ChargeAmount = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value.replace(/[^0-9]/g, ''));
    setAmount(numericValue);
  };

  const handleAddCharge = (charge: number) => {
    setAmount((prev) => prev + charge);
  };

  const handleReset = () => {
    setAmount(0);
  };

  return (
    <Content>
      <Text label={CHARGE.TITLE} type="titleSemiBold" />
      <div className={cx('content_wrapper')}>
        <Input
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
              size="large"
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
