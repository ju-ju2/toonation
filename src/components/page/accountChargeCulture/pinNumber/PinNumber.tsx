import classNames from 'classnames/bind';
import Content from '@/components/ui/content/Content';
import { PIN_NUMBER } from '@/constants/accountChargeCulture';
import styles from './pinNumber.module.scss';

const cx = classNames.bind(styles);

const PinNumber = () => {
  return <Content title={PIN_NUMBER.TITLE}></Content>;
};

export default PinNumber;
