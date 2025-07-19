import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Icon from '../../icon/Icon';
import Text from '../../text/Text';
import styles from './ChargeInput.module.scss';

type InputSizeType = 'small' | 'medium' | 'large';

interface ChargeInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: InputSizeType;
  value: string;
  onReset?: () => void;
}
const cx = classNames.bind(styles);

const ChargeInput = ({
  label,
  size = 'medium',
  placeholder,
  value,
  onReset,
  ...props
}: ChargeInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cx('container', { focused: isFocused }, size)}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cx('input')}
        placeholder={placeholder || '내용을 입력하세요'}
        inputMode="numeric"
        {...props}
      />
      {value ? (
        <div
          role="button"
          aria-label="입력값 지우기"
          className={cx('clear')}
          onClick={onReset}
        >
          <Icon name="X" size="md" color="secondary" />
        </div>
      ) : (
        <></>
      )}
      <Text label={label || ''} type="bodyMedium" />
    </div>
  );
};

export default ChargeInput;
