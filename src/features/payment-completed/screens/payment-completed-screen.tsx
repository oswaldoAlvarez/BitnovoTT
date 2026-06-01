import { Redirect, router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { selectActivePaymentOrder } from '@/features/payment/model/payment-selectors';
import { clearActiveOrder } from '@/features/payment/model/payment-slice';
import { PaymentCompletedCelebrationIcon } from '@/features/payment-completed/components/payment-completed-celebration-icon';
import { AppText } from '@/shared/components/app-text';
import { BitnovoPayLogoIcon } from '@/shared/components/icons/bitnovo-pay-logo-icon';
import { SecondaryActionButton } from '@/shared/components/secondary-action-button';

export const PaymentCompletedScreen = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectActivePaymentOrder);

  if (!order) {
    return <Redirect href="/create-payment" />;
  }

  const finishPayment = () => {
    dispatch(clearActiveOrder());
    router.replace('/create-payment');
  };

  return (
    <SafeAreaView
      className="flex-1 bg-screen"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View className="flex-1 bg-screen">
        <View className="items-center border-b border-border px-5 pb-4 pt-3">
          <BitnovoPayLogoIcon width={100} />
        </View>

        <View className="flex-1 justify-between px-5 pb-5 pt-12">
          <View className="flex-1 items-center justify-center">
            <PaymentCompletedCelebrationIcon />

            <AppText
              className="mt-8"
              fontWeight="bold"
              size="xl"
              textAlign="center"
            >
              Pago recibido
            </AppText>

            <AppText
              className="mt-3"
              color="muted"
              fontWeight="regular"
              size="lg"
              textAlign="center"
            >
              El pago se ha confirmado con éxito
            </AppText>
          </View>

          <SecondaryActionButton label="Finalizar" onPress={finishPayment} />
        </View>
      </View>
    </SafeAreaView>
  );
};
