import { useId, useState } from 'react';
import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './checkbox.module.scss';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const cx = classNames.bind(styles);

const Checkbox = ({
  label,
  checked,
  onChange,
  defaultChecked,
  ...props
}: CheckboxProps) => {
  const id = useId();
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false
  );

  const isControlled = typeof checked === 'boolean';
  const inputChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  return (
    <label htmlFor={id} className={cx('wrapper')}>
      <input
        type="checkbox"
        id={id}
        className={cx('checkbox')}
        checked={inputChecked}
        onChange={handleChange}
        {...props}
      />
      <span className={cx('custom')} />
      {label && <Text label={label} type="bodyMedium" />}
    </label>
  );
};

export default Checkbox;
