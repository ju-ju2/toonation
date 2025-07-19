import { useEffect, useState } from 'react';
import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';
import classNames from 'classnames/bind';
import { useGetChargeAmountApi } from '@/api/service/chargeAmount.hooks';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import PinNumberInput from '@/components/ui/input/pinNumberInput/PinNumberInput';
import Message from '@/components/ui/message/Message';
import Text from '@/components/ui/text/Text';
import { MESSAGE, PIN_NUMBER } from '@/constants/accountChargeCulture';
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

  const [pinMap, setPinMap] = useState<string[]>([]);
  const [repeatMessageShow, setRepeatMessageShow] = useState(false);
  const [dupMessageShow, setDupMessageShow] = useState(false);
  const [searchMessageShow, setSearchMessageShow] = useState(false);

  const handleAddInput = () => {
    append({ ...defaultValues });
  };

  const { mutate, isPending, isSuccess } = useGetChargeAmountApi();

  useEffect(() => {
    if (isSuccess) {
      setSearchMessageShow(true);
    }
  }, [isSuccess]);

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
                    if (isRepeatedNumber(value.pin)) {
                      setDupMessageShow(true);
                      onChange({ ...defaultValues });
                      return;
                    }
                    if (pinMap.includes(value.pin)) {
                      setRepeatMessageShow(true);
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
                          amount: data?.data?.chargeAmount || 0,
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
      <Message
        type="error"
        title={MESSAGE.REPEAT_ERROR.TITLE}
        description={MESSAGE.REPEAT_ERROR.DESCRIPTION}
        onClose={() => setRepeatMessageShow(false)}
        show={repeatMessageShow}
      />
      <Message
        type="error"
        title={MESSAGE.DUPLICATE_ERROR.TITLE}
        description={MESSAGE.DUPLICATE_ERROR.DESCRIPTION}
        onClose={() => setDupMessageShow(false)}
        show={dupMessageShow}
      />
      <Message
        type="success"
        title={MESSAGE.SUCCESS.TITLE}
        description={MESSAGE.SUCCESS.DESCRIPTION}
        onClose={() => setSearchMessageShow(false)}
        show={searchMessageShow}
      />
    </Content>
  );
};

export default PinNumber;
