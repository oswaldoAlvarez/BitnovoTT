import { View } from 'react-native';

import { AppText } from '@/shared/components/app-text';
import { cn } from '@/shared/lib/class-names';

type AlertCardTone = 'error' | 'info' | 'success' | 'warning';

type AlertCardProps = {
  className?: string;
  message: string;
  tone?: AlertCardTone;
};

const alertCardToneClassNames: Record<
  AlertCardTone,
  {
    container: string;
    iconBackground: string;
    iconText: string;
    symbol: string;
    text: string;
  }
> = {
  error: {
    container: 'bg-alert-error-surface',
    iconBackground: 'bg-alert-error-icon',
    iconText: 'text-alert-error-text',
    symbol: '×',
    text: 'text-alert-error-text',
  },
  info: {
    container: 'bg-alert-info-surface',
    iconBackground: 'bg-alert-info-icon',
    iconText: 'text-primary',
    symbol: '!',
    text: 'text-primary',
  },
  success: {
    container: 'bg-alert-success-surface',
    iconBackground: 'bg-alert-success-icon',
    iconText: 'text-success',
    symbol: '✓',
    text: 'text-success',
  },
  warning: {
    container: 'bg-alert-warning-surface',
    iconBackground: 'bg-alert-warning-icon',
    iconText: 'text-alert-warning-text',
    symbol: '!',
    text: 'text-alert-warning-text',
  },
};

export const AlertCard = ({
  className,
  message,
  tone = 'info',
}: AlertCardProps) => {
  const currentTone = alertCardToneClassNames[tone];

  return (
    <View
      className={cn(
        'w-full flex-row items-start gap-4 rounded-md px-5 py-5',
        currentTone.container,
        className,
      )}
    >
      <View
        className={cn(
          'mt-1 h-6 w-6 items-center justify-center rounded-full',
          currentTone.iconBackground,
        )}
      >
        <AppText className={currentTone.iconText} fontWeight="extrabold">
          {currentTone.symbol}
        </AppText>
      </View>

      <AppText className={cn('flex-1 text-sm leading-6', currentTone.text)}>
        {message}
      </AppText>
    </View>
  );
};
