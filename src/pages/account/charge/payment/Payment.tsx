import { useState } from 'react';
import classNames from 'classnames/bind';
import BottomSheet from '@/components/bottomSheet/BottomSheet';
import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import Carousel from '@/components/carousel/Carousel';
import Content from '@/components/content/Content';
import Icon from '@/components/icon/Icon';
import { Radio } from '@/components/radio/Radio';
import Text from '@/components/text/Text';
import {
  PAY_DOMESTIC_VARIANT,
  PAY_VARIANT_ABROAD,
  PAYMENT,
  type PayVariant,
  type PayVariantAbroadKey,
  type PayVariantKey,
} from '@/constants/enums';
import styles from './payment.module.scss';

const cx = classNames.bind(styles);

const Payment = () => {
  const [value, setValue] = useState<string | number>(PAYMENT.DOMESTIC);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPayVariant, setSelectedPayVariant] =
    useState<PayVariantKey | null>(null);
  const [payOptions, setPayOptions] = useState<PayVariant[]>([]);
  const [selectedPayAbroadVariant, setSelectedPayAbroadVariant] =
    useState<PayVariantAbroadKey | null>(null);

  // 중복 체크 + 추가 로직 분리
  const addPayOption = (variantKey: PayVariantKey) => {
    setPayOptions((prev) => {
      if (prev.some((option) => option.key === variantKey)) {
        return prev;
      }
      if (prev.length === Object.keys(PAY_DOMESTIC_VARIANT).length) {
        return prev;
      }
      return [PAY_DOMESTIC_VARIANT[variantKey], ...prev];
    });
  };

  const handleSelectVariant = (variantKey: PayVariantKey) => {
    setSelectedPayVariant(variantKey);
    addPayOption(variantKey);
    setIsOpen(false);
  };

  return (
    <Content title={PAYMENT.TITLE}>
      <Radio.Group value={value} onChange={setValue}>
        <Radio.Item value={PAYMENT.DOMESTIC} label={PAYMENT.DOMESTIC} />
        {value === PAYMENT.DOMESTIC && (
          <Carousel selectKey={selectedPayVariant || 'default'}>
            {[
              ...payOptions.map((option) => {
                if (option.key === 'CULTURE') {
                  return (
                    <Card
                      className={cx('culture_card')}
                      key={option.key}
                      onClick={() => setSelectedPayVariant(option.key)}
                      style={{ backgroundImage: `url(${option.image})` }}
                      isSelected={option.key === selectedPayVariant}
                    >
                      <Text
                        label={option.name}
                        type="titleSemiBold"
                        color="white"
                      />
                    </Card>
                  );
                }
                return (
                  <Card
                    key={option.key}
                    onClick={() => setSelectedPayVariant(option.key)}
                    style={{ backgroundImage: `url(${option.image})` }}
                    isSelected={option.key === selectedPayVariant}
                  />
                );
              }),
              <Card isMain key="default" onClick={() => setIsOpen(true)}>
                <div>
                  <Icon name="PlusBackground" size="md" />
                  <Text label="결제수단 추가" type="bodyMedium" />
                </div>
              </Card>,
            ]}
          </Carousel>
        )}
        <hr className={cx('border')} />
        <Radio.Item value={PAYMENT.FOREIGN} label={PAYMENT.FOREIGN} />
        {value === PAYMENT.FOREIGN && (
          <div className={cx('abroad_item_wrapper')}>
            {Object.values(PAY_VARIANT_ABROAD).map((item) => (
              <Button
                variant="secondary"
                key={item.key}
                onClick={() =>
                  setSelectedPayAbroadVariant(item.key as PayVariantAbroadKey)
                }
                selected={selectedPayAbroadVariant === item.key}
              >
                <div className={cx('text_wrapper')}>
                  <Text
                    label={item.name}
                    type="descriptionMedium"
                    className={cx([
                      'title',
                      { selected: selectedPayAbroadVariant === item.key },
                    ])}
                  />
                  {item.description ? (
                    <Text
                      label={`(${item.description})`}
                      type="descriptionMedium"
                    />
                  ) : null}
                </div>
              </Button>
            ))}
          </div>
        )}
      </Radio.Group>

      <BottomSheet
        title="결제 수단 선택"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className={cx('bottomSheet_content')}>
          {Object.entries(PAY_DOMESTIC_VARIANT).map(([_, item]) => (
            <Button
              key={item.name}
              variant="secondary"
              label={{ label: item.name }}
              direction="column"
              image={{ src: item.src, alt: item.name }}
              onClick={() => handleSelectVariant(item.key)}
              selected={selectedPayVariant === item.key}
            />
          ))}
        </div>
      </BottomSheet>
    </Content>
  );
};

export default Payment;
