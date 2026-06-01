import { useAppSelector } from '@/core/store/hooks';
import { usePaymentStatusSocket } from '@/features/payment/hooks/use-payment-status-socket';
import { selectActivePaymentOrder } from '@/features/payment/model/payment-selectors';

export const PaymentStatusListener = () => {
  const activeOrder = useAppSelector(selectActivePaymentOrder);
  usePaymentStatusSocket(activeOrder?.identifier);

  return null;
};
