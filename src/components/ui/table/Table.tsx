import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './table.module.scss';

interface TableProps {
  children: React.ReactNode;
}

interface ColumnProps {
  label: string;
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

const Table = ({ children }: TableProps) => {
  return (
    <table className={cx('table')}>
      <tbody>{children}</tbody>
    </table>
  );
};

const Column = ({ label, children }: ColumnProps) => {
  return (
    <tr className={cx('row')}>
      <td className={cx('label')}>
        <Text
          className={cx('text')}
          label={label}
          type="bodyMedium"
          color="secondary"
        />
      </td>
      <td className={cx('value')}>{children}</td>
    </tr>
  );
};

Table.Column = Column;

export default Table;
