import { createContext, useContext, useState } from 'react';
import type { AbroadPaymentKey, DomesticPaymentKey } from '@/constants/enums';

type PaymentType = {
  domestic?: DomesticPaymentKey;
  abroad?: AbroadPaymentKey;
};

interface ChargeContextType {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  payment: PaymentType;
  setPayment?: React.Dispatch<React.SetStateAction<PaymentType>>;
}

const ChargeContext = createContext<ChargeContextType | undefined>(undefined);

export const ChargeContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [amount, setAmount] = useState(0);
  const [payment, setPayment] = useState<PaymentType>({
    domestic: undefined,
    abroad: undefined,
  });

  return (
    <ChargeContext.Provider
      value={{
        amount,
        setAmount,
        payment,
        setPayment,
      }}
    >
      {children}
    </ChargeContext.Provider>
  );
};

export const useCharge = () => {
  const context = useContext(ChargeContext);
  if (!context) {
    throw new Error('useCharge must be used within an AmountProvider');
  }
  return context;
};
