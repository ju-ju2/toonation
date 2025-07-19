import { Controller, useFieldArray, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useGetChargeAmountApi } from '@/api/service/chargeAmount.hooks';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import Text from '@/components/ui/text/Text';
import { PIN_NUMBER } from '@/constants/accountChargeCulture';
import styles from './pinNumber.module.scss';

type PinInput = {
  pin: string;
  checked: boolean;
  isLoading?: boolean;
};

type FormValues = {
  pinInputs: PinInput[];
};

const cx = classNames.bind(styles);

const PinNumber = () => {
  const { mutate, data, isPending, isSuccess, isError } =
    useGetChargeAmountApi();

  const { control } = useForm<FormValues>({
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

  return (
    <Content title={PIN_NUMBER.PIN_NUMBER_TITLE}>
      <div className={cx('wrapper')}>
        {fields.map((field, idx) => (
          <Controller
            key={field.id}
            control={control}
            name={`pinInputs.${idx}`}
            render={({ field: { value, onChange } }) => (
              <PinNumberInput
                value={value.pin}
                type="text"
                size="small"
                placeholder={PIN_NUMBER.PIN_NUMBER_PLACEHOLDER}
                maxLength={13}
                onChange={(e) => {
                  const pinNum = e.target.value.replace(/[^0-9]/g, '');
                  e.target.value = pinNum; // 강제 정제
                  if (pinNum.length <= 13) onChange({ ...value, pin: pinNum });
                }}
                disabled={value.checked || isPending}
                button={{
                  label: PIN_NUMBER.BUTTON_LABEL,
                  disabled: value.pin?.length < 13,
                  isLoading: value.isLoading,
                  onClick: () => {
                    onChange({ ...value, isLoading: true });
                    console.log('Pin Number:', value.pin);

                    mutate(Number(value.pin), {
                      onSuccess: () => {
                        onChange({ ...value, checked: true, isLoading: false });
                      },
                      onError: () => {
                        onChange({ ...value, isLoading: false });
                      },
                    });
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
