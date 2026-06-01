import { Pressable, View } from 'react-native';

import type {
  CurrencyCode,
  PaymentCurrency,
} from '@/features/payment/model/currencies';
import { AppText } from '@/shared/components/app-text';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right-icon';
import { TickCircleIcon } from '@/shared/components/icons/tick-circle-icon';
import { cn } from '@/shared/lib/class-names';

import { CurrencyFlagIcon } from './currency-flag-icon';

type CurrencyOptionRowProps = {
  currency: PaymentCurrency;
  isSelected: boolean;
  onSelect: (code: CurrencyCode) => void;
};

export const CurrencyOptionRow = ({
  currency,
  isSelected,
  onSelect,
}: CurrencyOptionRowProps) => {
  const handlePress = () => {
    onSelect(currency.code);
  };

  return (
    <Pressable
      accessibilityLabel={`Seleccionar ${currency.code}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      className={cn(
        'flex-row items-center gap-3 rounded-sm px-3 py-3',
        isSelected
          ? 'bg-currency-row-selected'
          : 'hover:bg-currency-row-hover active:bg-currency-row-pressed',
      )}
      onPress={handlePress}
    >
      <CurrencyFlagIcon code={currency.code} />

      <View className="flex-1 gap-0.5">
        <AppText className="text-[13px]" fontWeight="semibold">
          {currency.name}
        </AppText>
        <AppText className="text-[11px]" color="muted">
          {currency.code}
        </AppText>
      </View>

      {isSelected ? <TickCircleIcon /> : <ArrowRightIcon />}
    </Pressable>
  );
};
