import { View } from 'react-native';

import type { PaymentOrder } from '@/features/payment/model/payment-order';
import { formatPaymentAmount } from '@/features/payment/utils/format-payment-amount';
import { AppText } from '@/shared/components/app-text';
import { PaymentRequestTimerIcon } from '@/features/share-payment/components/payment-request-timer-icon';

type PaymentRequestSummaryProps = {
  order: PaymentOrder;
};

export const PaymentRequestSummary = ({
  order,
}: PaymentRequestSummaryProps) => {
  return (
    <View className="rounded-[28px] bg-surface-muted px-5 py-6">
      <View className="flex-row items-center justify-center gap-4">
        <PaymentRequestTimerIcon />

        <View className="shrink items-start">
          <AppText className="text-[17px] leading-6" color="muted">
            Solicitud de pago
          </AppText>

          <AppText size="xl">
            {formatPaymentAmount(order.amount, order.currencyCode)}
          </AppText>
        </View>
      </View>

      <AppText
        className="mt-4 text-sm leading-5"
        color="muted"
        textAlign="center"
      >
        Comparte el enlace de pago con el cliente
      </AppText>
    </View>
  );
};
