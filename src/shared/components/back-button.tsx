import type { ComponentProps } from 'react';
import { Pressable } from 'react-native';

import { ChevronLeftIcon } from './icons/chevron-left-icon';

type BackButtonProps = Omit<ComponentProps<typeof Pressable>, 'children'>;

export const BackButton = ({
  accessibilityLabel = 'Volver',
  ...props
}: BackButtonProps) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className="h-9 w-9 items-center justify-center rounded-full bg-back-button"
      {...props}
    >
      <ChevronLeftIcon />
    </Pressable>
  );
};
