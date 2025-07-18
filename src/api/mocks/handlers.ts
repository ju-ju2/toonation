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
];
