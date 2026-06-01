import { Modal, Pressable, View } from 'react-native';

import type {
  WhatsAppCountry,
  WhatsAppCountryCode,
} from '@/features/share-payment/model/whatsapp-countries';
import { whatsappCountries } from '@/features/share-payment/model/whatsapp-countries';
import { AppText } from '@/shared/components/app-text';
import { ChevronDownIcon } from '@/shared/components/icons/chevron-down-icon';
import { TickCircleIcon } from '@/shared/components/icons/tick-circle-icon';
import { appColors } from '@/shared/theme/colors';

import { WhatsAppCountryFlagIcon } from './whatsapp-country-flag-icon';

type WhatsAppCountryPickerModalProps = {
  onClose: () => void;
  onSelect: (code: WhatsAppCountryCode) => void;
  selectedCode: WhatsAppCountryCode;
  visible: boolean;
};

const renderCountryName = (country: WhatsAppCountry) => {
  return `${country.name} (${country.dialCode})`;
};

export const WhatsAppCountryPickerModal = ({
  onClose,
  onSelect,
  selectedCode,
  visible,
}: WhatsAppCountryPickerModalProps) => {
  const handleSelectCountry = (code: WhatsAppCountryCode) => {
    onSelect(code);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <Pressable
        className="flex-1 justify-end bg-slate-900/20 px-4 pb-6"
        onPress={onClose}
      >
        <Pressable
          className="rounded-[28px] bg-surface px-5 py-5"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <AppText className="text-lg" fontWeight="semibold">
              Selecciona un pais
            </AppText>
            <ChevronDownIcon color={appColors['icon-secondary']} size={20} />
          </View>

          <View className="gap-1">
            {whatsappCountries.map((country) => {
              const isSelected = country.code === selectedCode;

              return (
                <Pressable
                  accessibilityRole="button"
                  className="min-h-14 flex-row items-center gap-3 rounded-2xl px-3 active:bg-surface-muted"
                  key={country.code}
                  onPress={() => handleSelectCountry(country.code)}
                >
                  <WhatsAppCountryFlagIcon code={country.code} />
                  <AppText className="flex-1 text-base" color="primary">
                    {renderCountryName(country)}
                  </AppText>
                  {isSelected ? (
                    <TickCircleIcon />
                  ) : (
                    <ChevronDownIcon
                      color={appColors['input-placeholder']}
                      size={18}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
