export interface GetChargeAmountRes {
  chargeAmount: number;
}

export interface PostChargeAmountReq {
  userId: string;
  amount: number;
}

export interface PostChargeAmountRes {
  success: boolean;
  amount: number;
  totalAmount?: number;
}
