import classNames from 'classnames/bind';
import Button from '../../button/Button';
import type { InputSizeType } from '../chargeInput/ChargeInput';
import styles from './pinNumberInput.module.scss';

interface PinNumberInputProps {
  size?: InputSizeType;
  placeholder?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cx = classNames.bind(styles);

const PinNumberInput = ({
  size = 'medium',
  placeholder = '핀 번호를 입력하세요',
  button,
  onChange,
}: PinNumberInputProps) => {
  return (
    <div className={cx('wrapper')}>
      <input
        className={cx(['input', size])}
        placeholder={placeholder}
        onChange={onChange}
        type="number"
      />
      {button && (
        <Button
          label={{ label: button?.label || '입력' }}
          size={size}
          onClick={button.onClick}
          className={cx('button')}
        />
      )}
    </div>
  );
};

export default PinNumberInput;
