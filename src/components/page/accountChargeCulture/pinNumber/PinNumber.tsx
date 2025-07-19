import { useState } from 'react';
import classNames from 'classnames/bind';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import Text from '@/components/ui/text/Text';
import { PIN_NUMBER } from '@/constants/accountChargeCulture';
import styles from './pinNumber.module.scss';

const cx = classNames.bind(styles);

const PinNumber = () => {
  const [inputLength, setInputLength] = useState<number>(
    PIN_NUMBER.DEFAULT_INPUT_LENGTH
  );
  const addButtonDisabled = inputLength >= PIN_NUMBER.MAX_INPUT_LENGTH;

  const handleAddInput = () => {
    if (addButtonDisabled) return;
    setInputLength((prev) => prev + 1);
  };

  return (
    <Content title={PIN_NUMBER.PIN_NUMBER_TITLE}>
      <div className={cx('wrapper')}>
        {Array.from({ length: inputLength }, (_, idx) => (
          <PinNumberInput
            key={idx}
            placeholder={PIN_NUMBER.PIN_NUMBER_PLACEHOLDER}
            size="small"
            button={{
              label: PIN_NUMBER.BUTTON_LABEL,
              onClick: () => alert(`핀 번호 ${idx + 1} 입력 완료`),
            }}
          />
        ))}
      </div>
      <div
        className={cx(['add_input_button', { disabled: addButtonDisabled }])}
        onClick={handleAddInput}
      >
        <Icon name="Plus" color={addButtonDisabled ? 'secondary' : 'primary'} />
        <Text
          label={PIN_NUMBER.PIN_NUMBER_ADD}
          type="bodyMedium"
          color="secondary"
        />
      </div>
    </Content>
  );
};

export default PinNumber;
