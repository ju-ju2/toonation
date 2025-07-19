import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import BottomSheet from '@/components/ui/bottomSheet/BottomSheet';
import Button from '@/components/ui/button/Button';
import Card from '@/components/ui/card/Card';
import Carousel from '@/components/ui/carousel/Carousel';
import Content from '@/components/ui/content/Content';
import Icon from '@/components/ui/icon/Icon';
import { Radio } from '@/components/ui/radio/Radio';
import Text from '@/components/ui/text/Text';
import {
  type AbroadPaymentKey,
  type DomesticPayment,
  type DomesticPaymentKey,
  PAYMENT,
  PAYMENT_ABROAD,
  PAYMENT_DOMESTIC,
  PAYMENT_TYPE,
  type PaymentType,
} from '@/constants/enums';
import { useCharge } from '@/context/ChargeContext';
import styles from './payment.module.scss';

const cx = classNames.bind(styles);

const Payment = () => {
  const { setPayment } = useCharge();

  const [paymentType, setPaymentType] = useState<PaymentType>(
    PAYMENT_TYPE.DOMESTIC
  );
  const [selectedDomesticPayment, setSelectedDomesticPayment] =
    useState<DomesticPaymentKey | null>(null);
  const [addedDomesticPaymentOptions, setAddedDomesticPaymentOptions] =
    useState<DomesticPayment[]>([]);

  const [selectedAbroadPayment, setSelectedAbroadPayment] =
    useState<AbroadPaymentKey | null>(null);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 중복 체크 + 추가 로직 분리
  const addPayOption = (paymentKey: DomesticPaymentKey) => {
    setAddedDomesticPaymentOptions((prev) => {
      if (prev.some((option) => option.key === paymentKey)) {
        return prev;
      }
      if (prev.length === Object.keys(PAYMENT_DOMESTIC).length) {
        return prev;
      }
      return [PAYMENT_DOMESTIC[paymentKey], ...prev];
    });
  };

  const handleSelectDomesticPaymentInBottomSheet = (
    paymentKey: DomesticPaymentKey
  ) => {
    setSelectedDomesticPayment(paymentKey);
    addPayOption(paymentKey);
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    if (setPayment) {
      if (paymentType === PAYMENT_TYPE.DOMESTIC && selectedDomesticPayment) {
        setPayment({ domestic: selectedDomesticPayment, abroad: undefined });
      } else if (paymentType === PAYMENT_TYPE.ABROAD && selectedAbroadPayment) {
        setPayment({ domestic: undefined, abroad: selectedAbroadPayment });
      }
    }
  }, [selectedDomesticPayment, selectedAbroadPayment]);

  return (
    <Content
      title={PAYMENT.TITLE}
      extra={
        paymentType === PAYMENT_TYPE.DOMESTIC && (
          <Button
            variant="secondary"
            direction="row"
            size="small"
            className={cx('content_extra_button')}
            onClick={() => setIsBottomSheetOpen(true)}
          >
            <Text label="결제수단변경" type="bodyMedium" />
            <Icon name="TriangleDown" color="secondary" />
          </Button>
        )
      }
    >
      <Radio.Group
        value={paymentType}
        onChange={(value) => setPaymentType(value as PaymentType)}
      >
        <Radio.Item value={PAYMENT_TYPE.DOMESTIC} label={PAYMENT.DOMESTIC} />
        {paymentType === PAYMENT_TYPE.DOMESTIC && (
          <div className={cx('carousel_wrapper')}>
            <Carousel selectKey={selectedDomesticPayment || 'default'}>
              {[
                ...addedDomesticPaymentOptions.map((option) => {
                  if (option.key === 'CULTURE') {
                    return (
                      <Card
                        className={cx('culture_card')}
                        key={option.key}
                        onClick={() => setSelectedDomesticPayment(option.key)}
                        style={{ backgroundImage: `url(${option.image})` }}
                        isSelected={option.key === selectedDomesticPayment}
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
                      onClick={() => setSelectedDomesticPayment(option.key)}
                      style={{ backgroundImage: `url(${option.image})` }}
                      isSelected={option.key === selectedDomesticPayment}
                    />
                  );
                }),
                <Card
                  isMain
                  key="default"
                  onClick={() => setIsBottomSheetOpen(true)}
                >
                  <div>
                    <Icon name="PlusBackground" size="md" />
                    <Text label="결제수단 추가" type="bodyMedium" />
                  </div>
                </Card>,
              ]}
            </Carousel>
          </div>
        )}
        <hr className={cx('border')} />
        <Radio.Item value={PAYMENT_TYPE.ABROAD} label={PAYMENT.ABROAD} />
        {paymentType === PAYMENT_TYPE.ABROAD && (
          <div className={cx('abroad_item_wrapper')}>
            {Object.values(PAYMENT_ABROAD).map((item) => (
              <Button
                variant="secondary"
                key={item.key}
                onClick={() =>
                  setSelectedAbroadPayment(item.key as AbroadPaymentKey)
                }
                selected={selectedAbroadPayment === item.key}
              >
                <div className={cx('text_wrapper')}>
                  <Text
                    label={item.name}
                    type="descriptionMedium"
                    className={cx([
                      'title',
                      { selected: selectedAbroadPayment === item.key },
                    ])}
                  />
                  {item.description ? (
                    <Text
                      label={`(${item.description})`}
                      type="descriptionMedium"
                      color="secondary"
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
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      >
        <div className={cx('bottomSheet_content')}>
          {Object.entries(PAYMENT_DOMESTIC).map(([_, item]) => (
            <Button
              key={item.name}
              variant="secondary"
              label={{ label: item.name }}
              direction="column"
              image={{ src: item.src, alt: item.name }}
              onClick={() => handleSelectDomesticPaymentInBottomSheet(item.key)}
              selected={selectedDomesticPayment === item.key}
            />
          ))}
        </div>
      </BottomSheet>
    </Content>
  );
};

export default Payment;
