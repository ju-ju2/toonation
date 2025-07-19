import classNames from 'classnames/bind';
import Button from '@/components/button/Button';
import Content from '@/components/content/Content';
import Text from '@/components/text/Text';
import { TOTAL_AMOUNT } from '@/constants/enums';
import { formatNumber } from '@/utils/utils';
import styles from './totalAmount.module.scss';

interface TotalAmountProps {
  amount?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const TotalAmount = ({
  amount = '0',
  disabled = false,
  onClick = () => {},
}: TotalAmountProps) => {
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
