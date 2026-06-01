import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';

import type { PaymentCurrency } from '@/features/payment/model/currencies';
import { AppText } from '@/shared/components/app-text';
import { ChevronDownIcon } from '@/shared/components/icons/chevron-down-icon';
import { cn } from '@/shared/lib/class-names';

type CurrencySelectorButtonProps = {
  currency: PaymentCurrency;
} & Omit<ComponentProps<typeof Pressable>, 'children'>;

export const CurrencySelectorButton = ({
  className,
  currency,
  ...props
}: CurrencySelectorButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      className={cn(
        'h-11 min-w-[88px] items-center justify-center rounded-full bg-back-button px-4',
        className,
      )}
      {...props}
    >
      <View className="flex-row items-center justify-center">
        <AppText
          className="text-[15px] leading-[18px]"
          fontWeight="semibold"
          numberOfLines={1}
        >
          {currency.code}
        </AppText>
        <View className="ml-1.5 items-center justify-center">
          <ChevronDownIcon />
        </View>
      </View>
    </Pressable>
  );
};
