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

  const scrollToNext = () => {
    const keys = children
      .map((child) => child.key)
      .filter((key): key is string => typeof key === 'string');
    const currentIndex = keys.indexOf(centerKey);
    if (currentIndex < keys.length - 1) {
      const nextKey = keys[currentIndex + 1];
      scrollToCenter(nextKey);
      setCenterKey(nextKey);
    }
  };

  const scrollToPrev = () => {
    const keys = children
      .map((child) => child.key)
      .filter((key): key is string => typeof key === 'string');
    const currentIndex = keys.indexOf(centerKey);
    if (currentIndex > 0) {
      const prevKey = keys[currentIndex - 1];
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
    <div className={cx('carouselWrapper')}>
      <div className={cx('carouselContainer')} ref={containerRef}>
        <div className={cx('carouselSpacer')} /> {/* 좌측 여백 */}
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
        <div className={cx('carouselSpacer')} /> {/* 우측 여백 */}
      </div>
      <Icon
        name="ArrowLeft"
        size="md"
        color="secondary"
        className={cx(['icon', 'left'])}
        onClick={scrollToPrev}
      />
      <Icon
        name="ArrowRight"
        color="secondary"
        size="md"
        className={cx(['icon', 'right'])}
        onClick={scrollToNext}
      />
    </div>
  );
}
