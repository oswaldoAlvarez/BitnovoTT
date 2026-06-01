import { Pressable } from 'react-native';

import type { WhatsAppCountry } from '@/features/share-payment/model/whatsapp-countries';
import { AppText } from '@/shared/components/app-text';
import { ChevronDownIcon } from '@/shared/components/icons/chevron-down-icon';

import { WhatsAppCountryFlagIcon } from './whatsapp-country-flag-icon';

type WhatsAppCountrySelectorButtonProps = {
  country: WhatsAppCountry;
  onPress: () => void;
};

export const WhatsAppCountrySelectorButton = ({
  country,
  onPress,
}: WhatsAppCountrySelectorButtonProps) => {
  return (
    <Pressable
      accessibilityLabel="Seleccionar prefijo de WhatsApp"
      accessibilityRole="button"
      className="flex-row items-center gap-1 self-center"
      onPress={onPress}
    >
      <WhatsAppCountryFlagIcon code={country.code} size={22} />
      <AppText color="primary">{country.dialCode}</AppText>
      <ChevronDownIcon size={18} />
    </Pressable>
  );
};
