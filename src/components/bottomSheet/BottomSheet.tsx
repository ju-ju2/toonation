import { useRef } from 'react';
import classNames from 'classnames/bind';
import Text from '../text/Text';
import styles from './bottomSheet.module.scss';

const cx = classNames.bind(styles);

interface BottomSheetProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({
  title,
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isOpen && (
        <div className={cx('overlay')} onClick={onClose}>
          <div
            ref={sheetRef}
            className={cx('sheet', { open: isOpen })}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className={cx('header')}>
                <Text label={title} type="headlineBold" />
              </div>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
}
