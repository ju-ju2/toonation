import { useRef } from 'react';
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
    disabled?: boolean;
    isLoading?: boolean;
  };
}

const cx = classNames.bind(styles);

const PinNumberInput = ({
  size = 'medium',
  placeholder = '핀 번호를 입력하세요',
  button,
  onChange,
  disabled = false,
  value,
  ...props
}: PinNumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cx('wrapper')}>
      <input
        ref={inputRef}
        className={cx(['input', size])}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {button && (
        <Button
          label={{ label: button.isLoading ? '' : button?.label }}
          icon={
            button.isLoading
              ? { name: 'Spinner', color: 'white', size: 'lg' }
              : undefined
          }
          size={size}
          onClick={button.onClick}
          className={cx('button')}
          disabled={button.disabled || disabled}
        />
      )}
    </div>
  );
};

export default PinNumberInput;
