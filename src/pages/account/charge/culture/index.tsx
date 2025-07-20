import { useEffect, useId, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { usePostChargeCultureApi } from '@/api/service/charge.hooks';
import type { PostChargeCultureRes } from '@/api/type/apiType';
import PinNumber from '@/components/page/accountChargeCulture/pinNumber/PinNumber';
import TotalCultureAmount from '@/components/page/accountChargeCulture/totalCultureAmount/TotalCultureAmount';
import Button from '@/components/ui/button/Button';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import Content from '@/components/ui/content/Content';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import Text from '@/components/ui/text/Text';
import {
  ACTION_MESSAGE,
  AGREEMENT,
  PIN_NUMBER,
  TOTAL_CULTURE_AMOUNT,
} from '@/constants/accountChargeCulture';
import { useGlobalContext } from '@/context/GlobalContext';
import { PAGE_PATH } from '@/routes';
import styles from './index.module.scss';

export type PinValues = {
  pin: string;
  checked: boolean;
  isLoading: boolean;
  amount: number;
};

export type ChargeFormType = {
  pinValues: PinValues[];
};

const cx = classNames.bind(styles);

const AccountChargeCulturePage = () => {
  const { message } = useGlobalContext();
  const { mutate, data, isPending, isSuccess, isError, error } =
    usePostChargeCultureApi();

  const [agree, setAgree] = useState(false);

  const defaultValues: PinValues = {
    pin: '',
    checked: false,
    isLoading: false,
    amount: 0,
  };

  const pinValuesForm = useForm<ChargeFormType>({
    defaultValues: {
      pinValues: Array.from(
        { length: PIN_NUMBER.DEFAULT_INPUT_LENGTH },
        () => ({
          ...defaultValues,
        })
      ),
    },
  });

  const formFieldsName = 'pinValues';

  const pinValues = pinValuesForm.getValues(formFieldsName);
  const isDataValid = pinValues.map((item) => item.checked).includes(true);

  const id = useId();
  const navigate = useNavigate();

  const chargeAmount = pinValues.reduce(
    (acc, curr) => acc + (curr.checked ? curr.amount : 0),
    0
  );

  const handleCharge = () => {
    const chargeFee = chargeAmount * TOTAL_CULTURE_AMOUNT.FEE_RATE;
    const totalAmount = chargeAmount - chargeFee;

    mutate({ userId: id, amount: totalAmount });
  };

  useEffect(() => {
    if (isSuccess) {
      message({
        type: 'success',
        title: ACTION_MESSAGE.SUCCESS_CHARGE.TITLE,
        description: ACTION_MESSAGE.SUCCESS_CHARGE.DESCRIPTION,
        key: ACTION_MESSAGE.SUCCESS_CHARGE.TITLE,
      });
      navigate(PAGE_PATH.ACCOUNT_CHARGE_RESULT, {
        state: {
          amount: data.data?.amount,
          totalAmount: data.data?.totalAmount,
        } as PostChargeCultureRes,
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
    <FormProvider {...pinValuesForm}>
      <div className={cx('container')}>
        <PageHeader label="문화상품권 충전" />
        <PinNumber
          pinValuesForm={pinValuesForm}
          formFieldsName={formFieldsName}
          defaultValues={defaultValues}
        />
        <Divider />
        <TotalCultureAmount chargeAmount={chargeAmount} />
        <Content className={cx('wrapper')}>
          <Text label={AGREEMENT.TITLE} type="bodyMedium" color="secondary" />
          <Text
            label={AGREEMENT.DESCRIPTION}
            type="descriptionMedium"
            color="secondary"
          />
          <Checkbox
            label={AGREEMENT.AGREE}
            checked={agree}
            onChange={setAgree}
          />
          <Button
            label={{ label: AGREEMENT.BUTTON_LABEL }}
            onClick={handleCharge}
            disabled={!agree || !isDataValid || isPending}
            icon={
              isPending
                ? { name: 'Loading', size: 'lg', color: 'white' }
                : undefined
            }
          />
        </Content>
      </div>
    </FormProvider>
  );
};

export default AccountChargeCulturePage;
