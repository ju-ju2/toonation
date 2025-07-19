import classNames from 'classnames/bind';
import Button from '../../button/Button';
import type { InputSizeType } from '../chargeInput/ChargeInput';
import styles from './pinNumberInput.module.scss';

interface PinNumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSizeType;
  button?: {
    label: string;
    onClick: () => void;
  };
}

const cx = classNames.bind(styles);

const PinNumberInput = ({
  size = 'medium',
  placeholder = '핀 번호를 입력하세요',
  button,
  onChange,
  disabled = false,
  ...props
}: PinNumberInputProps) => {
  return (
    <div className={cx('wrapper')}>
      <input
        className={cx(['input', size])}
        placeholder={placeholder}
        onChange={onChange}
        type="number"
        disabled={disabled}
        {...props}
      />
      {button && (
        <Button
          label={{ label: button?.label || '입력' }}
          size={size}
          onClick={button.onClick}
          className={cx('button')}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default PinNumberInput;
