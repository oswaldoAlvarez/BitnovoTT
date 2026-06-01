import { Pressable } from 'react-native';

import { AppText } from '@/shared/components/app-text';

type ShareSendButtonProps = {
  accessibilityLabel: string;
  disabled: boolean;
  onPress: () => void;
};

export const ShareSendButton = ({
  accessibilityLabel,
  disabled,
  onPress,
}: ShareSendButtonProps) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className={
        disabled
          ? 'min-h-11 items-center justify-center rounded-xl bg-button-disabled px-4'
          : 'min-h-11 items-center justify-center rounded-xl bg-button-active px-4 active:bg-button-active-pressed'
      }
      disabled={disabled}
      onPress={onPress}
    >
      <AppText
        color={disabled ? 'buttonDisabled' : 'buttonActive'}
        fontWeight="bold"
      >
        Enviar
      </AppText>
    </Pressable>
  );
};
