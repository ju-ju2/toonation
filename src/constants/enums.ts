export const CHARGE_AMOUNT_MAP = {
  1: 1000,
  2: 10000,
  3: 50000,
} as const;

export const CHARGE = {
  TITLE: '충전 금액',
  CHARGE_AMOUNT: '* 충전 금액은 1,000 캐시 단위로만 결제 가능합니다.',
} as const;

export const PAYMENT = {
  TITLE: '결제 방법',
  DOMESTIC: '국내 결제',
  FOREIGN: '해외 결제',
} as const;

export const PAY_DOMESTIC_VARIANT = {
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

export type PayVariantKey = keyof typeof PAY_DOMESTIC_VARIANT;
export type PayVariant = (typeof PAY_DOMESTIC_VARIANT)[PayVariantKey];

export const PAY_VARIANT_ABROAD = {
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

export type PayVariantAbroadKey = keyof typeof PAY_VARIANT_ABROAD;
