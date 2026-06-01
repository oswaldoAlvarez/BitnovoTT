import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '@/shared/components/app-text';
import { TickCircleIcon } from '@/shared/components/icons/tick-circle-icon';
import { appColors } from '@/shared/theme/colors';

import { ShareActionIcon } from './share-action-icon';

type PaymentUrlRowProps = {
  onCopy: () => void;
  onOpenQr: () => void;
  webUrl: string;
};

export const PaymentUrlRow = ({
  onCopy,
  onOpenQr,
  webUrl,
}: PaymentUrlRowProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    await onCopy();

    setIsCopied(true);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <View className="flex-row items-stretch gap-3">
      <Pressable
        accessibilityLabel="Copiar enlace de pago"
        className={
          isCopied
            ? 'min-h-16 flex-1 flex-row items-center gap-3 rounded-2xl border border-success bg-surface px-5'
            : 'min-h-16 flex-1 flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-5 active:border-primary active:bg-surface-muted'
        }
        onPress={handleCopy}
      >
        {isCopied ? (
          <TickCircleIcon color={appColors.success} size={20} />
        ) : (
          <ShareActionIcon name="link" size={20} />
        )}
        <AppText
          className="flex-1 text-lg"
          color={isCopied ? 'success' : 'primary'}
          numberOfLines={1}
        >
          {isCopied ? 'Enlace copiado' : webUrl}
        </AppText>
      </Pressable>
      <Pressable
        accessibilityLabel="Mostrar QR"
        className="min-h-16 w-20 items-center justify-center rounded-2xl bg-primary active:bg-button-active-pressed"
        onPress={onOpenQr}
      >
        <ShareActionIcon name="qr" size={24} />
      </Pressable>
    </View>
  );
};
