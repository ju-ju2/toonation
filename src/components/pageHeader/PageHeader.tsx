import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './pageHeader.module.scss';

interface PageHeaderProps {
  label: string;
}

const cx = classNames.bind(styles);

const PageHeader = ({ label }: PageHeaderProps) => {
  return (
    <div className={cx('wrapper')}>
      <Text as="h1" type="headlineBold" label={label} />
    </div>
  );
};

export default PageHeader;
