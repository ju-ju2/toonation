import classNames from 'classnames/bind';
import Content from '@/components/ui/content/Content';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import { PIN_NUMBER } from '@/constants/accountChargeCulture';
import styles from './pinNumber.module.scss';

const cx = classNames.bind(styles);

const PinNumber = () => {
  return (
    <Content title={PIN_NUMBER.PIN_NUMBER_TITLE}>
      <PinNumberInput
        placeholder={PIN_NUMBER.PIN_NUMBER_PLACEHOLDER}
        size="small"
        button={{
          label: PIN_NUMBER.BUTTON_LABEL,
          onClick: () => alert('핀 번호 입력 완료'),
        }}
      />
    </Content>
  );
};

export default PinNumber;
