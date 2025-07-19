import { http, HttpResponse } from 'msw';
import type { BaseApiResponse } from '../type/common';

interface MatchingUserCard {
  profileImage: string;
  nickname: string;
  matchCount: number;
  location: string;
}
// 더미 데이터 생성
const dummyUsers: MatchingUserCard[] = Array.from({ length: 30 }, (_, i) => ({
  profileImage: '/svg/default-profile-icon.svg',
  nickname: `유저 ${i + 1}`,
  matchCount: Math.floor(Math.random() * 10) + 1,
  location: `지역 ${i + 1}`,
}));

// API 핸들러
export const handlers = [
  http.get('/api/matching-users', () => {
    const randomUser =
      dummyUsers[Math.floor(Math.random() * dummyUsers.length)];

    return HttpResponse.json<BaseApiResponse<MatchingUserCard[]>>({
      code: 200,
      data: [randomUser],
      message: '매칭 유저 조회 성공',
    });
  }),
  http.get('/api/charge-amount/:number', async ({ params }) => {
    const number = params.number as string;
    const isValid = number && /^\d{13}$/.test(number);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!isValid) {
      return HttpResponse.json(
        {
          code: 400,
          data: null,
          message: '13자리 숫자를 전달해주세요.',
        },
        { status: 400 }
      );
    }

    // 1% 확률로 에러 응답
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

    return HttpResponse.json({
      code: 200,
      data: { chargeAmount: 5000 },
      message: '상품권 조회에 성공하였습니다.',
    });
  }),
];
