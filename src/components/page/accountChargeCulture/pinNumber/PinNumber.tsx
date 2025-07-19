import { type Control, Controller, useFieldArray } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useGetChargeAmountApi } from '@/api/service/chargeAmount.hooks';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import Text from '@/components/ui/text/Text';
import { PIN_NUMBER } from '@/constants/accountChargeCulture';
import type { ChargeFormType, PinValues } from '@/pages/account/charge/culture';
import styles from './pinNumber.module.scss';

interface PinNumberInputProps {
  control: Control<ChargeFormType, unknown, ChargeFormType>;
  formFieldsName: 'pinValues';
  defaultValues: PinValues;
}

const cx = classNames.bind(styles);

const PinNumber = ({
  control,
  formFieldsName,
  defaultValues,
}: PinNumberInputProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: formFieldsName,
  });

  const handleAddInput = () => {
    append({ ...defaultValues });
  };

  const { mutate, isPending } = useGetChargeAmountApi();

  const addButtonDisabled = fields.length >= PIN_NUMBER.MAX_INPUT_LENGTH;

  return (
    <Content title={PIN_NUMBER.PIN_NUMBER_TITLE}>
      <div className={cx('wrapper')}>
        {fields.map((field, idx) => (
          <Controller
            key={field.id}
            control={control}
            name={`pinValues.${idx}`}
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
                    mutate(Number(value.pin), {
                      onSuccess: (data) => {
                        onChange({
                          ...value,
                          checked: true,
                          isLoading: false,
                          amount: data?.data?.chargeAmount || 0,
                        });
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
