export const PIN_NUMBER = {
  TITLE: '문화상품권 충전',
  PIN_NUMBER_TITLE: '핀번호 직접 입력',
  PIN_NUMBER_PLACEHOLDER: '문화상품권 핀번호 입력 (18자리)',
  PIN_NUMBER_ADD: '핀번호 추가 (5개까지 추가 가능)',
  BUTTON_LABEL: '조회',
  DEFAULT_INPUT_LENGTH: 3,
  MAX_INPUT_LENGTH: 5,
} as const;

export const TOTAL_CULTURE_AMOUNT = {
  CHARGE_AMOUNT: '충전 금액',
  CHARE_FEE: '수수료',
  TOTAL_AMOUNT: '총 충전 캐시',
  CHARGE_UNIT_WON: '원',
  CHARGE_UNIT_CASH: '캐시',
  FEE_RATE: 0.1, // 10% 수수료
} as const;

export const AGREEMENT = {
  TITLE: '유의사항',
  DESCRIPTION: '* 캐시 충전 완료된 핀번호는 취소 불가합니다.',
  AGREE: '유의사항을 확인하였으며 문화상품권 충전에 동의합니다.',
  BUTTON_LABEL: '충전하기',
} as const;

export const MESSAGE = {
  SUCCESS: {
    TITLE: 'Success',
    DESCRIPTION: '조회에 성공하였습니다.',
  },
  DUPLICATE_ERROR: {
    TITLE: 'Error',
    DESCRIPTION: '이미 등록된 PIN 번호입니다.',
  },
  REPEAT_ERROR: {
    TITLE: 'Error',
    DESCRIPTION: '사용 완료된 PIN 번호입니다.',
  },
};
