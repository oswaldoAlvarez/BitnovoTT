import { AppText } from '@/shared/components/app-text';
import { appColors } from '@/shared/theme/colors';

type AmountSymbolProps = {
  isActive: boolean;
  symbol: string;
};

export const AmountSymbol = ({ isActive, symbol }: AmountSymbolProps) => {
  return (
    <AppText
      className="leading-[48px]"
      fontWeight="bold"
      size="xxl"
      textAlign="center"
      style={{
        color: isActive
          ? appColors['amount-active']
          : appColors['amount-placeholder'],
        includeFontPadding: false,
      }}
    >
      {symbol}
    </AppText>
  );
};
