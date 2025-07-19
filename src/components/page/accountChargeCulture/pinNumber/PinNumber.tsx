import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import Text from '@/components/ui/text/Text';
import { PIN_NUMBER } from '@/constants/accountChargeCulture';
import styles from './pinNumber.module.scss';

type PinInput = {
  pin: string;
  checked: boolean;
};

type FormValues = {
  pinInputs: PinInput[];
};

const cx = classNames.bind(styles);

const PinNumber = () => {
  // const { mutate, isPending, isSuccess } = useGetChargeAmountApi();

  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      pinInputs: Array.from(
        { length: PIN_NUMBER.DEFAULT_INPUT_LENGTH },
        () => ({ pin: '', checked: false }) as PinInput
      ),
    },
  });

  const formFieldsName = 'pinInputs';

  const { fields, append } = useFieldArray({
    control,
    name: formFieldsName,
  });

  const addButtonDisabled = fields.length >= PIN_NUMBER.MAX_INPUT_LENGTH;

  const handleAddInput = () => {
    append({ pin: '', checked: false });
  };

  const pinInputs = watch(formFieldsName);

  return (
    <Content title={PIN_NUMBER.PIN_NUMBER_TITLE}>
      <div className={cx('wrapper')}>
        {fields.map((field, idx) => (
          <Controller
            key={field.id}
            control={control}
            name={`pinInputs.${idx}.pin`}
            render={({ field: controllerField }) => (
              <PinNumberInput
                {...controllerField}
                type="text"
                size="small"
                placeholder={PIN_NUMBER.PIN_NUMBER_PLACEHOLDER}
                maxLength={13}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  e.target.value = value; // 강제 정제
                  if (value.length <= 13) controllerField.onChange(value);
                }}
                button={{
                  label: PIN_NUMBER.BUTTON_LABEL,
                  disabled: pinInputs[idx]?.pin.length < 13,
                  onClick: () => {
                    console.log('조회', pinInputs[idx]?.pin);
                  },
                }}
              />
            )}
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
