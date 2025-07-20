import { http, HttpResponse } from 'msw';
import { generateRandomDigitNumber } from '@/utils/utils';
import { endPoints } from '../endpoint';
import type { GetChargeAmountRes, PostChargeAmountRes } from '../type/apiType';
import type { BaseApiResponse } from '../type/common';

// API 핸들러
export const handlers = [
  http.get(endPoints.chargeAmountPin, async ({ params }) => {
    const number = params.number as string;
    const isValid = number && /^\d{13}$/.test(number);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!isValid) {
      return HttpResponse.json<BaseApiResponse<GetChargeAmountRes>>(
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
      return HttpResponse.json<BaseApiResponse<GetChargeAmountRes>>(
        {
          code: 500,
          data: undefined,
          message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        },
        { status: 500 }
      );
    }

    return HttpResponse.json<BaseApiResponse<GetChargeAmountRes>>({
      code: 200,
      data: { chargeAmount: 5000 },
      message: '상품권 조회에 성공하였습니다.',
    });
  }),

  http.post(endPoints.chargeAmount, async ({ request }) => {
    const body = (await request.json()) as { userId: string; amount: number };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 여기에 로직이 필요하면 작성 (예: 유효성 검사, 더미 응답 생성 등)

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

    return HttpResponse.json<BaseApiResponse<PostChargeAmountRes>>({
      code: 200,
      data: { success: true, amount: body.amount, totalAmount },
      message: '결제가 성공적으로 처리되었습니다.',
    });
  }),
];
