export const CHARGE_AMOUNT_MAP = {
  1: 1000,
  2: 10000,
  3: 50000,
} as const;

export const CHARGE = {
  TITLE: '충전 금액',
  CHARGE_AMOUNT: '* 충전 금액은 1,000 캐시 단위로만 결제 가능합니다.',
} as const;

export const PAYMENT_TYPE = {
  TITLE: '결제 방법',
  DOMESTIC: '국내 결제',
  ABROAD: '해외 결제',
} as const;

export const PAYMENT_DOMESTIC = {
  NAVER: {
    key: 'NAVER',
    name: '네이버페이',
    src: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_naverpay_light_off.png?v=4',
    image:
      'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/img_naver_card.png',
  },
  KAKAO: {
    key: 'KAKAO',
    name: '카카오페이',
    src: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_kakaopay_light_off.png?v=4',
    image:
      'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/img_kakao_card.png',
  },
  TOSS: {
    key: 'TOSS',
    name: '토스페이',
    src: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_toss_light_off.png?v=4',
    image:
      'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/img_toss_card.png',
  },
  CULTURE: {
    key: 'CULTURE',
    name: '문화상품권',
    src: 'https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_bookgift_light_off.png?v=4',
    image: '',
  },
} as const;

export type DomesticPaymentKey = keyof typeof PAYMENT_DOMESTIC;
export type DomesticPayment = (typeof PAYMENT_DOMESTIC)[DomesticPaymentKey];

export const PAYMENT_ABROAD = {
  VISA_MS_JCB: {
    key: 'VISA_MS_JCB',
    name: '신용카드',
    description: 'VISA/MASTER/JCB',
  },
  AMEX: {
    key: 'AMEX',
    name: '신용카드',
    description: 'AMEX',
  },
  UNION: {
    key: 'UNION',
    name: '유니온 페이',
    description: '',
  },
  VISA_MS: {
    key: 'VISA_MS',
    name: '신용카드',
    description: 'VISA/MASTER',
  },
};

export type AbroadPaymentKey = keyof typeof PAYMENT_ABROAD;

export const TOTAL_AMOUNT = {
  TITLE: '최종 결제 금액',
  DESCRIPTION: [
    '* 캐시 유효기간: 마지막 사용일로부터 5년',
    '* 결제 금액에는 모든 세금이 포함되어 있습니다.',
    '* 만 19세 미만 미성년자 회원은 법정대리인 동의가 필요하며, 동의가 완료 된 후 캐시 충전 서비스 이용이 가능합니다.',
  ],
  BUTTON_LABEL: '충전하기',
} as const;
