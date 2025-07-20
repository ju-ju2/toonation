import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import Message from './Message';
import styles from './message.module.scss';

export type MessageType = 'success' | 'error';

export interface MessageProps {
  title: string;
  description?: string;
  type: MessageType;
  key: string;
}

type StaticFn = (args: MessageProps) => void;

export interface MessageInstance {
  success: StaticFn;
  error: StaticFn;
}

const cx = classNames.bind(styles);

export const useMessage = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const open = useCallback((options: MessageProps) => {
    const key = options.key || String(Date.now());
    setMessages((prev) => [...prev, { ...options, key }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.key !== key));
    }, 2000);
  }, []);

  const messageApi = {
    success: (options: Omit<MessageProps, 'type'>) =>
      open({ ...options, type: 'success' }),
    error: (options: Omit<MessageProps, 'type'>) =>
      open({ ...options, type: 'error' }),
    open,
  };

  const contextHolder = (
    <div className={cx('context_holder')}>
      {messages.map(({ key, title, description, type }) => (
        <Message
          key={key}
          title={title}
          description={description}
          type={type}
          show={true}
          onClose={() =>
            setMessages((prev) => prev.filter((msg) => msg.key !== key))
          }
        />
      ))}
    </div>
  );

  return [messageApi, contextHolder] as const;
};
