import classNames from 'classnames/bind';
import PinNumber from '@/components/page/accountChargeCulture/pinNumber/PinNumber';
import TotalCultureAmount from '@/components/page/accountChargeCulture/totalCultureAmount/TotalCultureAmount';
import Divider from '@/components/ui/divider/Divider';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargeCulturePage = () => {
  return (
    <div className={cx('container')}>
      <PageHeader label="문화상품권 충전" />
      <PinNumber />
      <Divider />
      <TotalCultureAmount />
    </div>
  );
};

export default AccountChargeCulturePage;
