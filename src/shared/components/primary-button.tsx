import type { ComponentProps } from 'react';
import { Pressable } from 'react-native';

import { cn } from '@/shared/lib/class-names';

import { AppText } from './app-text';

type PrimaryButtonProps = {
  className?: string;
  label: string;
} & Omit<ComponentProps<typeof Pressable>, 'children' | 'className'>;

export const PrimaryButton = ({
  accessibilityLabel,
  accessibilityState,
  className,
  disabled,
  label,
  ...props
}: PrimaryButtonProps) => {
  const isDisabled = Boolean(disabled);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ ...accessibilityState, disabled: isDisabled }}
      className={cn(
        'min-h-14 items-center justify-center rounded-md px-5 py-4',
        isDisabled
          ? 'bg-button-disabled'
          : 'bg-button-active active:bg-button-active-pressed',
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      <AppText
        color={isDisabled ? 'buttonDisabled' : 'buttonActive'}
        fontWeight="bold"
      >
        {label}
      </AppText>
    </Pressable>
  );
};
