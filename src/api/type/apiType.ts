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

export interface PostChargeCardReq {
  userId: string;
  amount: number;
  isDomestic: boolean;
}

export interface PostChargeCardRes {
  amount: number;
  totalAmount: number;
}
