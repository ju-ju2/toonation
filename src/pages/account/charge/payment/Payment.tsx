import { useState } from 'react';
import classNames from 'classnames/bind';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import Content from '@/components/content/Content';
import Icon from '@/components/icon/Icon';
import { Radio } from '@/components/radio/Radio';
import Text from '@/components/text/Text';
import { PAY_VARIANT, PAYMENT, type PayVariantKey } from '@/constants/enums';
import styles from './payment.module.scss';

const cx = classNames.bind(styles);

const Payment = () => {
  const [value, setValue] = useState<string | number>(PAYMENT.DOMESTIC);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPayVariant, setSelectedPayVariant] =
    useState<PayVariantKey | null>(null);

  const handleSelectVariant = (variantKey: PayVariantKey) => {
    setSelectedPayVariant(variantKey);
    setIsOpen(false);
  };

  return (
    <>
      <Content title={PAYMENT.TITLE}>
        <Radio.Group value={value} onChange={setValue}>
          <Radio.Item value={PAYMENT.DOMESTIC} label={PAYMENT.DOMESTIC} />
          {value === PAYMENT.DOMESTIC && (
            <div className={cx('domestic_item_wrapper')}>
              <Card isMain onClick={() => setIsOpen(true)}>
                <div>
                  <Icon name="PlusBackground" size="md" />
                  <Text label="결제수단 추가" type="bodyMedium" />
                </div>
              </Card>
            </div>
          )}
          <hr className={cx('border')} />
          <Radio.Item value={PAYMENT.FOREIGN} label={PAYMENT.FOREIGN} />
          {value === PAYMENT.FOREIGN && (
            <div className={cx('abroad_item_wrapper')}></div>
          )}
        </Radio.Group>
        <BottomSheet
          title="결제 수단 선택"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className={cx('bottomSheet_content')}>
            {Object.entries(PAY_VARIANT).map(([key, item]) => (
              <Button
                key={item.name}
                variant="secondary"
                label={{ label: item.name }}
                direction="column"
                image={{ src: item.src, alt: item.name }}
                onClick={() => handleSelectVariant(key as PayVariantKey)}
                selected={selectedPayVariant === key}
              />
            ))}
          </div>
        </BottomSheet>
      </Content>
    </>
  );
};

export default Payment;
