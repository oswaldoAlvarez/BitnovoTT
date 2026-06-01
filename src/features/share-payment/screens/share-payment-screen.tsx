import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { useAppSelector } from '@/core/store/hooks';
import type { PaymentOrder } from '@/features/payment/model/payment-order';
import { selectActivePaymentOrder } from '@/features/payment/model/payment-selectors';
import { EmailShareRow } from '@/features/share-payment/components/email-share-row';
import { PaymentRequestSummary } from '@/features/share-payment/components/payment-request-summary';
import { PaymentUrlRow } from '@/features/share-payment/components/payment-url-row';
import { RequestSentModal } from '@/features/share-payment/components/request-sent-modal';
import { ShareActionIcon } from '@/features/share-payment/components/share-action-icon';
import { ShareActionRow } from '@/features/share-payment/components/share-action-row';
import { WhatsAppCountryPickerModal } from '@/features/share-payment/components/whatsapp-country-picker-modal';
import { WhatsAppShareRow } from '@/features/share-payment/components/whatsapp-share-row';
import { useSharePayment } from '@/features/share-payment/hooks/use-share-payment';
import { AppScreen } from '@/shared/components/app-screen';
import { SecondaryActionButton } from '@/shared/components/secondary-action-button';

const SharePaymentContent = ({ order }: { order: PaymentOrder }) => {
  const sharePayment = useSharePayment(order);

  return (
    <AppScreen>
      <View className="flex-1 justify-between gap-8">
        <View className="gap-4">
          <PaymentRequestSummary order={order} />

          <PaymentUrlRow
            onCopy={sharePayment.copyPaymentUrl}
            onOpenQr={sharePayment.goToPaymentQr}
            webUrl={order.webUrl}
          />

          <View className="gap-2">
            <EmailShareRow
              email={sharePayment.emailRecipient}
              onChangeEmail={sharePayment.setEmailRecipient}
              onPressSend={sharePayment.shareByEmail}
            />

            <WhatsAppShareRow
              country={sharePayment.selectedWhatsAppCountry}
              onChangePhoneNumber={sharePayment.setWhatsAppPhoneNumber}
              onOpenCountryPicker={sharePayment.openWhatsAppCountryPicker}
              onPressSend={sharePayment.shareByWhatsapp}
              phoneNumber={sharePayment.whatsAppPhoneNumber}
            />

            <ShareActionRow
              icon="share"
              label="Compartir con otras aplicaciones"
              onPress={sharePayment.shareWithOtherApps}
            />
          </View>
        </View>

        <SecondaryActionButton
          label="Nueva solicitud"
          onPress={sharePayment.startNewPayment}
          rightIcon={<ShareActionIcon name="newRequest" size={24} />}
        />
      </View>

      <RequestSentModal
        onClose={sharePayment.closeRequestSentModal}
        visible={sharePayment.isRequestSentModalVisible}
      />
      <WhatsAppCountryPickerModal
        onClose={sharePayment.closeWhatsAppCountryPicker}
        onSelect={sharePayment.setSelectedWhatsAppCountryCode}
        selectedCode={sharePayment.selectedWhatsAppCountryCode}
        visible={sharePayment.isWhatsAppCountryPickerVisible}
      />
    </AppScreen>
  );
};

export const SharePaymentScreen = () => {
  const order = useAppSelector(selectActivePaymentOrder);

  if (!order) {
    return <Redirect href="/create-payment" />;
  }

  return <SharePaymentContent order={order} />;
};
