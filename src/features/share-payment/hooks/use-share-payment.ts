import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, Share } from 'react-native';

import { useAppDispatch } from '@/core/store/hooks';
import type { PaymentOrder } from '@/features/payment/model/payment-order';
import { clearActiveOrder } from '@/features/payment/model/payment-slice';
import {
  defaultWhatsAppCountryCode,
  getWhatsAppCountryByCode,
  type WhatsAppCountryCode,
} from '@/features/share-payment/model/whatsapp-countries';
import {
  isValidEmail,
  openEmailComposer,
} from '@/features/share-payment/utils/email';
import { getPhoneDigits } from '@/features/share-payment/utils/phone-number';

export const useSharePayment = (order: PaymentOrder) => {
  const dispatch = useAppDispatch();
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isRequestSentModalVisible, setIsRequestSentModalVisible] =
    useState(false);
  const [isWhatsAppCountryPickerVisible, setIsWhatsAppCountryPickerVisible] =
    useState(false);
  const [selectedWhatsAppCountryCode, setSelectedWhatsAppCountryCode] =
    useState<WhatsAppCountryCode>(defaultWhatsAppCountryCode);
  const [whatsAppPhoneNumber, setWhatsAppPhoneNumber] = useState('');
  const selectedWhatsAppCountry = getWhatsAppCountryByCode(
    selectedWhatsAppCountryCode,
  );
  const shareMessage = `Completa tu pago aquí: ${order.webUrl}`;

  const closeRequestSentModal = () => {
    setIsRequestSentModalVisible(false);
  };

  const closeWhatsAppCountryPicker = () => {
    setIsWhatsAppCountryPickerVisible(false);
  };

  const copyPaymentUrl = async () => {
    await Clipboard.setStringAsync(order.webUrl);
  };

  const goToPaymentQr = () => {
    router.push('/payment-qr');
  };

  const openWhatsAppCountryPicker = () => {
    setIsWhatsAppCountryPickerVisible(true);
  };

  const shareByEmail = async () => {
    if (!isValidEmail(emailRecipient)) {
      Alert.alert(
        'Correo requerido',
        'Introduce un correo valido para enviar la solicitud.',
      );
      return;
    }

    try {
      const hasOpenedComposer = await openEmailComposer({
        body: shareMessage,
        recipient: emailRecipient,
        subject: 'Solicitud de pago',
      });

      if (hasOpenedComposer) {
        setIsRequestSentModalVisible(true);
        return;
      }

      Alert.alert(
        'No se pudo abrir el correo',
        'No tienes una aplicación de correo compatible configurada en este dispositivo.',
      );
    } catch (error) {
      console.warn('Unable to open email URL:', error);
      Alert.alert('Error', 'No se pudo abrir la aplicación de correo.');
    }
  };

  const shareByWhatsapp = async () => {
    const phoneDigits = getPhoneDigits(whatsAppPhoneNumber);

    if (!phoneDigits) {
      Alert.alert(
        'Numero requerido',
        'Introduce un numero de WhatsApp para enviar la solicitud.',
      );
      return;
    }

    const countryDigits = selectedWhatsAppCountry.dialCode.replace(/\D/g, '');
    const fullPhoneNumber = `${countryDigits}${phoneDigits}`;
    const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodeURIComponent(
      shareMessage,
    )}`;

    try {
      await Linking.openURL(whatsappUrl);
      setIsRequestSentModalVisible(true);
    } catch (error) {
      console.warn('Unable to open WhatsApp URL:', error);
      Alert.alert('Error', 'No se pudo abrir WhatsApp.');
    }
  };

  const shareWithOtherApps = async () => {
    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      console.warn('Unable to share payment request:', error);
      Alert.alert('Error', 'No se pudo compartir la solicitud de pago.');
    }
  };

  const startNewPayment = () => {
    dispatch(clearActiveOrder());
    router.back();
  };

  return {
    closeRequestSentModal,
    closeWhatsAppCountryPicker,
    copyPaymentUrl,
    emailRecipient,
    goToPaymentQr,
    isRequestSentModalVisible,
    isWhatsAppCountryPickerVisible,
    openWhatsAppCountryPicker,
    selectedWhatsAppCountry,
    selectedWhatsAppCountryCode,
    setEmailRecipient,
    setSelectedWhatsAppCountryCode,
    setWhatsAppPhoneNumber,
    shareByEmail,
    shareByWhatsapp,
    shareWithOtherApps,
    startNewPayment,
    whatsAppPhoneNumber,
  };
};
