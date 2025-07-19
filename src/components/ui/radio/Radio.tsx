import { createContext, type ReactNode, useContext, useId } from 'react';
import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './radio.module.scss';

export type RadioValueType = string | number;

type RadioGroupContextType = {
  value: RadioValueType;
  onChange: (value: RadioValueType) => void;
};

type RadioGroupProps = {
  value: RadioValueType;
  onChange: (value: RadioValueType) => void;
  children: ReactNode;
};

type RadioItemProps = {
  value: RadioValueType;
  label: string;
  disabled?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

const cx = classNames.bind(styles);

const Group = ({ value, onChange, children }: RadioGroupProps) => {
  return (
    <RadioGroupContext.Provider value={{ value, onChange }}>
      <div role="radiogroup" className={cx('radio_group')}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

const Item = ({ value, label, disabled = false }: RadioItemProps) => {
  const context = useContext(RadioGroupContext);
  const id = useId();

  if (!context) {
    throw new Error('Radio.Item must be used within a Radio.Group');
  }

  const { value: selectedValue, onChange } = context;
  const checked = selectedValue === value;

  return (
    <label htmlFor={id} className={cx(['radio', { disabled }])}>
      <input
        id={id}
        type="radio"
        value={String(value)}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
      />
      <span></span>
      <Text label={label} type="titleSemiBold" />
    </label>
  );
};

export const Radio = {
  Group,
  Item,
};
