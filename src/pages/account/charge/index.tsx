import classNames from 'classnames/bind';
import Content from '@/components/content/Content';
import PageHeader from '@/components/pageHeader/PageHeader';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const AccountChargePage = () => {
  return (
    <div className={cx('container')}>
      <PageHeader label="충전하기" />
      <Content>sdasdasd</Content>
    </div>
  );
};

export default AccountChargePage;
