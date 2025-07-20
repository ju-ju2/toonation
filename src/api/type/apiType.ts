export interface GetCulturePinRes {
  amount: number;
}

export interface PostChargeCultureReq {
  userId: string;
  amount: number;
}

export interface PostChargeCultureRes {
  amount: number;
  totalAmount: number;
}
