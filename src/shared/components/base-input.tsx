import type { ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import { TextInput, View } from 'react-native';

import { cn } from '@/shared/lib/class-names';
import { appColors } from '@/shared/theme/colors';

type BaseInputProps = TextInputProps & {
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const BaseInput = ({
  className,
  containerClassName,
  leftIcon,
  placeholderTextColor = appColors['input-placeholder'],
  rightIcon,
  ...props
}: BaseInputProps) => {
  return (
    <View
      className={cn(
        'min-h-12 flex-row items-center gap-2 rounded-2xl border border-border bg-surface px-4',
        containerClassName,
      )}
    >
      {leftIcon}
      <TextInput
        className={cn('flex-1 p-0 text-[13px] text-text', className)}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {rightIcon}
    </View>
  );
};
