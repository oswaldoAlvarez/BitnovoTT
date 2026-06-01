import type { ComponentProps, ReactNode } from 'react';
import { Pressable } from 'react-native';

import { cn } from '@/shared/lib/class-names';

import { AppText } from './app-text';

type SecondaryActionButtonProps = {
  className?: string;
  label: string;
  rightIcon?: ReactNode;
} & Omit<ComponentProps<typeof Pressable>, 'children' | 'className'>;

export const SecondaryActionButton = ({
  accessibilityLabel,
  className,
  label,
  rightIcon,
  ...props
}: SecondaryActionButtonProps) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      className={cn(
        'min-h-16 flex-row items-center justify-center gap-3 rounded-2xl bg-surface-muted px-5 active:bg-surface',
        className,
      )}
      {...props}
    >
      <AppText className="text-2xl" color="primary" fontWeight="semibold">
        {label}
      </AppText>
      {rightIcon}
    </Pressable>
  );
};
