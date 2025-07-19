import { useState } from 'react';
import classNames from 'classnames/bind';
import PinNumber from '@/components/page/accountChargeCulture/pinNumber/PinNumber';
import TotalCultureAmount from '@/components/page/accountChargeCulture/totalCultureAmount/TotalCultureAmount';
import Button from '@/components/ui/button/Button';
import Checkbox from '@/components/ui/checkbox/Checkbox';
import Content from '@/components/ui/content/Content';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import Text from '@/components/ui/text/Text';
import { AGREEMENT } from '@/constants/accountChargeCulture';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargeCulturePage = () => {
  const [agree, setAgree] = useState(false);

  return (
    <div className={cx('container')}>
      <PageHeader label="문화상품권 충전" />
      <PinNumber />
      <Divider />
      <TotalCultureAmount />
      <Content className={cx('wrapper')}>
        <Text label={AGREEMENT.TITLE} type="bodyMedium" color="secondary" />
        <Text
          label={AGREEMENT.DESCRIPTION}
          type="descriptionMedium"
          color="secondary"
        />

        <Checkbox label={AGREEMENT.AGREE} checked={agree} onChange={setAgree} />
        <Button label={{ label: AGREEMENT.BUTTON_LABEL }} />
      </Content>
    </div>
  );
};

export default AccountChargeCulturePage;
