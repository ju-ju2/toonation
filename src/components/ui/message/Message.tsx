// Message.tsx
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './message.module.scss';

interface MessageProps {
  title: string;
  description?: string;
  type: 'success' | 'error';
  onClose: () => void;
  show: boolean;
}

const cx = classNames.bind(styles);
const Message = ({ title, description, type, onClose, show }: MessageProps) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose(); // 외부에서 상태 false로 바꾸게
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300); // exit 애니메이션 시간
      return () => clearTimeout(timeout);
    }
  }, [show, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={cx('message', type, {
        show: show,
      })}
    >
      <Text label={title} type="titleSemiBold" />
      <Text label={description || ''} type="bodyMedium" />
    </div>
  );
};

export default Message;
