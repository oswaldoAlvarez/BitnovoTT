import { TextInput, View } from 'react-native';

import { AmountSymbol } from '@/shared/components/amount-symbol';
import { appColors } from '@/shared/theme/colors';
import { sanitizeAmountValue } from '@/shared/utils/amount';

type AmountInputProps = {
  currencySymbol: string;
  currencySymbolPosition?: 'left' | 'right';
  onAmountChange: (amount: string) => void;
  value: string;
};

export const AmountInput = ({
  currencySymbol,
  currencySymbolPosition = 'left',
  onAmountChange,
  value,
}: AmountInputProps) => {
  const handleChangeText = (nextValue: string) => {
    onAmountChange(sanitizeAmountValue(nextValue));
  };

  return (
    <View className="min-h-20 flex-row items-center justify-center gap-2">
      {currencySymbolPosition === 'left' ? (
        <AmountSymbol isActive={Boolean(value)} symbol={currencySymbol} />
      ) : null}
      <TextInput
        accessibilityLabel="Importe"
        autoFocus
        className="text-[40px] font-bold leading-[48px]"
        keyboardType="decimal-pad"
        onChangeText={handleChangeText}
        placeholder="0.00"
        placeholderTextColor={appColors['amount-placeholder']}
        selectionColor={appColors['amount-active']}
        style={{
          color: appColors['amount-active'],
          includeFontPadding: false,
          paddingVertical: 0,
        }}
        value={value}
      />
      {currencySymbolPosition === 'right' ? (
        <AmountSymbol isActive={Boolean(value)} symbol={currencySymbol} />
      ) : null}
    </View>
  );
};
