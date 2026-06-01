import { TextInput, View } from 'react-native';

import type { WhatsAppCountry } from '@/features/share-payment/model/whatsapp-countries';
import {
  hasValidPhoneNumber,
  sanitizePhoneNumber,
} from '@/features/share-payment/utils/phone-number';
import { appColors } from '@/shared/theme/colors';

import { ShareActionIcon } from './share-action-icon';
import { ShareSendButton } from './share-send-button';
import { WhatsAppCountrySelectorButton } from './whatsapp-country-selector-button';

type WhatsAppShareRowProps = {
  country: WhatsAppCountry;
  onChangePhoneNumber: (value: string) => void;
  onOpenCountryPicker: () => void;
  onPressSend: () => void;
  phoneNumber: string;
};

export const WhatsAppShareRow = ({
  country,
  onChangePhoneNumber,
  onOpenCountryPicker,
  onPressSend,
  phoneNumber,
}: WhatsAppShareRowProps) => {
  const handleChangeText = (value: string) => {
    onChangePhoneNumber(sanitizePhoneNumber(value));
  };

  const isSendDisabled = !hasValidPhoneNumber(phoneNumber);

  return (
    <View className="min-h-16 flex-row items-center gap-2 rounded-2xl border border-border bg-surface-muted px-4">
      <View className="w-5 items-center">
        <ShareActionIcon name="whatsapp" size={20} />
      </View>

      <WhatsAppCountrySelectorButton
        country={country}
        onPress={onOpenCountryPicker}
      />

      <TextInput
        accessibilityLabel="Numero de WhatsApp"
        autoComplete="tel"
        className="min-w-0 flex-1 p-0 text-text"
        inputMode="numeric"
        keyboardType="number-pad"
        maxLength={15}
        onChangeText={handleChangeText}
        placeholder="200 5869 75423"
        placeholderTextColor={appColors['input-placeholder']}
        style={{
          fontSize: 16,
          height: 24,
          includeFontPadding: false,
          lineHeight: 22,
          paddingBottom: 0,
          paddingTop: 0,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
        value={phoneNumber}
      />

      <ShareSendButton
        accessibilityLabel="Enviar por WhatsApp"
        disabled={isSendDisabled}
        onPress={onPressSend}
      />
    </View>
  );
};
