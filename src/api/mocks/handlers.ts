import { http, HttpResponse } from 'msw';
import { generateRandomDigitNumber } from '@/utils/utils';
import { endPoints } from '../endpoint';
import type {
  GetCulturePinRes,
  PostChargeCardReq,
  PostChargeCardRes,
  PostChargeCultureReq,
  PostChargeCultureRes,
} from '../type/apiType';
import type { BaseApiResponse } from '../type/common';

// API 핸들러
export const handlers = [
  // 상품권 핀번호 조회
  http.get(endPoints.chargeCulturePin, async ({ params }) => {
    const pin = params.pin as string;
    const isValid = pin && /^\d{13}$/.test(pin);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!isValid) {
      return HttpResponse.json<BaseApiResponse<GetCulturePinRes>>(
        {
          code: 400,
          data: undefined,
          message: '13자리 숫자를 전달해주세요.',
        },
        { status: 400 }
      );
    }

    // 1% 확률로 에러 응답
    if (Math.random() < 0.01) {
      return HttpResponse.json<BaseApiResponse<GetCulturePinRes>>(
        {
          code: 500,
          data: undefined,
          message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
        { status: 500 }
      );
    }

    return HttpResponse.json<BaseApiResponse<GetCulturePinRes>>({
      code: 200,
      data: { amount: 5000 },
      message: '상품권 조회에 성공하였습니다.',
    });
  }),

  // 상품권 충전 요청
  http.post(endPoints.chargeCulture, async ({ request }) => {
    const body = (await request.json()) as PostChargeCultureReq;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() < 0.01) {
      return HttpResponse.json(
        {
          code: 500,
          data: null,
          message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
        { status: 500 }
      );
    }

    const totalAmount = generateRandomDigitNumber(7) * 1000; // 최소 충전 금액 1,000원 단위로 생성

    return HttpResponse.json<BaseApiResponse<PostChargeCultureRes>>({
      code: 200,
      data: { amount: body.amount, totalAmount },
      message: '결제가 성공적으로 처리되었습니다.',
    });
  }),

  // 카드 충전 요청
  http.post(endPoints.chargeCard, async ({ request }) => {
    const body = (await request.json()) as PostChargeCardReq;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() < 0.01) {
      return HttpResponse.json(
        {
          code: 500,
          data: null,
          message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
        { status: 500 }
      );
    }

    const totalAmount = generateRandomDigitNumber(7) * 1000; // 최소 충전 금액 1,000원 단위로 생성

    return HttpResponse.json<BaseApiResponse<PostChargeCardRes>>({
      code: 200,
      data: { amount: body.amount, totalAmount },
      message: '결제가 성공적으로 처리되었습니다.',
    });
  }),
];
