import classNames from 'classnames/bind';
import Button from '@/components/button/Button';
import Content from '@/components/content/Content';
import PageHeader from '@/components/pageHeader/PageHeader';
import Text from '@/components/text/Text';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargePage = () => {
  return (
    <div className={cx('container')}>
      <PageHeader label="충전하기" />
      <Content>
        <Text label="충전 금액" type="titleSemiBold" />
        <Button label={{ label: '충전하기' }} variant="primary" />
        <Button
          label={{ label: '충전하기', type: 'bodyMedium' }}
          variant="secondary"
          icon={{ name: 'Plus', size: 'xs' }}
        />
      </Content>
    </div>
  );
};

export default AccountChargePage;
