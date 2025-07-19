import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import PinNumber from '@/components/page/accountChargeCulture/pinNumber/PinNumber';
import TotalCultureAmount from '@/components/page/accountChargeCulture/totalCultureAmount/TotalCultureAmount';
import Button from '@/components/ui/button/Button';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import Content from '@/components/ui/content/Content';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import Text from '@/components/ui/text/Text';
import { AGREEMENT, PIN_NUMBER } from '@/constants/accountChargeCulture';
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
  const pinValues = pinValuesForm.watch(formFieldsName);

  return (
    <FormProvider {...pinValuesForm}>
      <div className={cx('container')}>
        <PageHeader label="문화상품권 충전" />
        <PinNumber
          control={pinValuesForm.control}
          formFieldsName={formFieldsName}
          defaultValues={defaultValues}
        />
        <Divider />
        <TotalCultureAmount pinValues={pinValues} />
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
          <Button label={{ label: AGREEMENT.BUTTON_LABEL }} />
        </Content>
      </div>
    </FormProvider>
  );
};

export default AccountChargeCulturePage;
