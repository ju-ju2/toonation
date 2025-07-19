import classNames from 'classnames/bind';
import Content from '@/components/ui/content/Content';
import Text from '@/components/ui/text/Text';
import { TOTAL_CULTURE_AMOUNT } from '@/constants/accountChargeCulture';
import type { PinValues } from '@/pages/account/charge/culture';
import { formatNumber } from '@/utils/utils';
import styles from './totalCultureAmount.module.scss';

interface TotalCultureAmountProps {
  pinValues: PinValues[];
}
const cx = classNames.bind(styles);

const TotalCultureAmount = ({ pinValues }: TotalCultureAmountProps) => {
  const chargeAmount = pinValues.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );
  const chargeFee = chargeAmount * TOTAL_CULTURE_AMOUNT.FEE_RATE;
  const totalAmount = chargeAmount + chargeFee;

  return (
    <Content>
      <div className={cx('row')}>
        <Text label={TOTAL_CULTURE_AMOUNT.CHARGE_AMOUNT} />
        <Text
          label={`${formatNumber(chargeAmount) || 0} ${TOTAL_CULTURE_AMOUNT.CHARGE_UNIT_WON}`}
        />
      </div>
      <div className={cx('row')}>
        <Text label={TOTAL_CULTURE_AMOUNT.CHARE_FEE} />
        <Text
          label={`${formatNumber(chargeFee) || 0} ${TOTAL_CULTURE_AMOUNT.CHARGE_UNIT_WON}`}
        />
      </div>
      <hr className={cx('border')} />
      <div className={cx('row')}>
        <Text label={TOTAL_CULTURE_AMOUNT.TOTAL_AMOUNT} type="headlineBold" />
        <Text
          label={`${formatNumber(totalAmount) || 0} ${TOTAL_CULTURE_AMOUNT.CHARGE_UNIT_CASH}`}
          type="headlineBold"
        />
      </div>
    </Content>
  );
};

export default TotalCultureAmount;
