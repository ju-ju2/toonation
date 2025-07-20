import { useEffect, useState } from 'react';
import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useGetCulturePinApi } from '@/api/service/culture.hooks';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import Text from '@/components/ui/text/Text';
import { ACTION_MESSAGE, PIN_NUMBER } from '@/constants/accountChargeCulture';
import { useGlobalContext } from '@/context/GlobalContext';
import type { ChargeFormType, PinValues } from '@/pages/account/charge/culture';
import { isRepeatedNumber } from '@/utils/utils';
import styles from './pinNumber.module.scss';

interface PinNumberInputProps {
  pinValuesForm: UseFormReturn<ChargeFormType, unknown, ChargeFormType>;
  formFieldsName: 'pinValues';
  defaultValues: PinValues;
}

const cx = classNames.bind(styles);

const PinNumber = ({
  pinValuesForm,
  formFieldsName,
  defaultValues,
}: PinNumberInputProps) => {
  const { control } = pinValuesForm;
  const { fields, append } = useFieldArray({
    control,
    name: formFieldsName,
  });
  const addButtonDisabled = fields.length >= PIN_NUMBER.MAX_INPUT_LENGTH;

  const [pinMap, setPinMap] = useState<string[]>([]);

  const { message } = useGlobalContext();

  const { mutate, isPending, isSuccess, isError, error } =
    useGetCulturePinApi();

  const handleAddInput = () => {
    append({ ...defaultValues });
  };

  useEffect(() => {
    if (isSuccess) {
      message({
        type: 'success',
        title: ACTION_MESSAGE.SUCCESS_BASIC.TITLE,
        description: ACTION_MESSAGE.SUCCESS_BASIC.DESCRIPTION,
        key: ACTION_MESSAGE.SUCCESS_BASIC.TITLE,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      message({
        type: 'error',
        title: error?.name,
        description: error?.message,
        key: error?.name,
      });
    }
  }, [isError]);

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
                    if (isRepeatedNumber(value.pin)) {
                      message({
                        type: 'error',
                        title: ACTION_MESSAGE.ERROR_REPEAT.TITLE,
                        description: ACTION_MESSAGE.ERROR_REPEAT.DESCRIPTION,
                        key: ACTION_MESSAGE.ERROR_REPEAT.TITLE,
                      });
                      onChange({ ...defaultValues });
                      return;
                    }
                    if (pinMap.includes(value.pin)) {
                      message({
                        type: 'error',
                        title: ACTION_MESSAGE.ERROR_DUPLICATE.TITLE,
                        description: ACTION_MESSAGE.ERROR_DUPLICATE.DESCRIPTION,
                        key: ACTION_MESSAGE.ERROR_DUPLICATE.TITLE,
                      });
                      onChange({ ...defaultValues });
                      return;
                    }
                    onChange({ ...value, isLoading: true });
                    mutate(Number(value.pin), {
                      onSuccess: (data) => {
                        onChange({
                          ...value,
                          checked: true,
                          isLoading: false,
                          amount: data?.data?.amount || 0,
                        });
                        setPinMap((prev) => [...prev, value.pin]);
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
