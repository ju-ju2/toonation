import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '@/components/ui/button/Button';
import Content from '@/components/ui/content/Content';
import Text from '@/components/ui/text/Text';
import { TOTAL_AMOUNT } from '@/constants/enums';
import { useCharge } from '@/context/ChargeContext';
import { ROUTER } from '@/routes';
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
        onClick={() => {
          navigate(ROUTER.ACCOUNT_CHARGE_CULTURE);
        }}
      />
    </Content>
  );
};

export default TotalAmount;
