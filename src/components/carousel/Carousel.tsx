import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Icon from '../icon/Icon';
import styles from './carousel.module.scss';

interface CarouselProps {
  selectKey: string;
  children: React.ReactElement[];
}

const cx = classNames.bind(styles);

export default function Carousel({ selectKey, children }: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [centerKey, setCenterKey] = useState<string>(selectKey);

  const scrollToCenter = (key: string) => {
    const container = containerRef.current;
    const item = itemRefs.current[key];

    if (container && item) {
      const containerCenter = container.clientWidth / 2;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const scrollTo = itemCenter - containerCenter;

      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  };

  const itemKeys = children
    .map((child) => child.key)
    .filter((key): key is string => typeof key === 'string');
  const currentIndex = itemKeys.indexOf(centerKey);

  const scrollToNext = () => {
    if (currentIndex < itemKeys.length - 1) {
      const nextKey = itemKeys[currentIndex + 1];
      scrollToCenter(nextKey);
      setCenterKey(nextKey);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      const prevKey = itemKeys[currentIndex - 1];
      scrollToCenter(prevKey);
      setCenterKey(prevKey);
    }
  };

  useEffect(() => {
    if (selectKey) {
      scrollToCenter(selectKey);
      setCenterKey(selectKey);
    }
  }, [selectKey]);

  return (
    <div className={cx('carouselContainer')}>
      <div className={cx('carouselWrapper')} ref={containerRef}>
        <div className={cx('carouselEmptyBox')} /> {/* 좌측 여백 */}
        {children.map((child) => {
          const key = child.key;
          if (!key || typeof key !== 'string') return child;

          return (
            <div
              className={cx('carouselItem')}
              ref={(el) => {
                itemRefs.current[key] = el;
              }}
              key={key}
            >
              {child}
            </div>
          );
        })}
        <div className={cx('carouselEmptyBox')} /> {/* 우측 여백 */}
      </div>
      {currentIndex !== 0 && (
        <Icon
          name="ArrowLeft"
          size="md"
          color="secondary"
          className={cx(['icon', 'left'])}
          onClick={scrollToPrev}
        />
      )}
      {currentIndex !== children.length - 1 && (
        <Icon
          name="ArrowRight"
          color="secondary"
          size="md"
          className={cx(['icon', 'right'])}
          onClick={scrollToNext}
        />
      )}
    </div>
  );
}
