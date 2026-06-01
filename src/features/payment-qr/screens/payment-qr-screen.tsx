import { Redirect, router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '@/core/store/hooks';
import { PaymentQrCode } from '@/features/payment-qr/components/payment-qr-code';
import { selectActivePaymentOrder } from '@/features/payment/model/payment-selectors';
import { formatPaymentAmount } from '@/features/payment/utils/format-payment-amount';
import { AlertCard } from '@/shared/components/alert-card';
import { AppText } from '@/shared/components/app-text';
import { BackButton } from '@/shared/components/back-button';

const goBack = () => {
  router.back();
};

export const PaymentQrScreen = () => {
  const order = useAppSelector(selectActivePaymentOrder);

  if (!order) {
    return <Redirect href="/create-payment" />;
  }

  return (
    <SafeAreaView
      className="flex-1 bg-primary"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View className="flex-1 px-5 py-4">
        <BackButton onPress={goBack} />

        <View className="mt-12 flex-1 gap-5">
          <AlertCard
            message="Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay."
            tone="info"
          />

          <View className="rounded-md bg-surface">
            <PaymentQrCode value={order.webUrl} size={360} />
          </View>

          <AppText
            color="surface"
            fontWeight="semibold"
            size="xl"
            textAlign="center"
          >
            {formatPaymentAmount(order.amount, order.currencyCode)}
          </AppText>

          <AppText className="text-[12px]" color="surface" textAlign="center">
            Esta pantalla se actualizará automáticamente.
          </AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};
