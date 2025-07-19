import classNames from 'classnames/bind';
import Button from '@/components/ui/button/Button';
import Content from '@/components/ui/content/Content';
import Text from '@/components/ui/text/Text';
import { TOTAL_AMOUNT } from '@/constants/enums';
import { useCharge } from '@/context/ChargeContext';
import { formatNumber } from '@/utils/utils';
import styles from './totalAmount.module.scss';

interface TotalAmountProps {
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const TotalAmount = ({ onClick = () => {} }: TotalAmountProps) => {
  const { amount, payment } = useCharge();
  const isDomestic = payment?.domestic !== undefined;
  const isAbroad = payment?.abroad !== undefined;
  const isValidAmount = amount > 1000;
  const disabled = !(isDomestic || isAbroad) || !isValidAmount;

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
        disabled={disabled}
        onClick={onClick}
      />
    </Content>
  );
};

export default TotalAmount;
