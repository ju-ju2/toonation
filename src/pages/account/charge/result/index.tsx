import classNames from 'classnames/bind';
import Button from '@/components/ui/button/Button';
import PageHeader from '@/components/ui/pageHeader/PageHeader';
import Table from '@/components/ui/table/Table';
import Text from '@/components/ui/text/Text';
import { formatNumber } from '@/utils/utils';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const data = {
  amount: 1000,
  totalAmount: 235451,
};

const AccountChargeResultPage = () => {
  return (
    <div className={cx('container')}>
      <PageHeader label="충전 완료" />
      <div className={cx('wrapper')}>
        <img
          className={cx('image')}
          src="https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/main/toonation/images/thegoods_logo.svg?v=2"
        />
        <Table>
          <Table.Column label="충전 캐시">
            <div className={cx('amount_wrapper')}>
              <Text
                label={formatNumber(data.amount)}
                type="titleSemiBold"
                color="primary"
              />
              <Text label="캐시" type="titleSemiBold" />
            </div>
          </Table.Column>
          <Table.Column label="보유 캐시 잔액">
            <Text
              label={`${formatNumber(data.totalAmount)} 캐시`}
              type="titleSemiBold"
            />
          </Table.Column>
        </Table>
        <Button
          className={cx('button')}
          label={{ label: '확인' }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default AccountChargeResultPage;
