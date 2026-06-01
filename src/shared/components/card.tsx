import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { cn } from '@/shared/lib/class-names';

type CardProps = PropsWithChildren<
  ViewProps & {
    className?: string;
  }
>;

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn(
        'gap-3 rounded-lg border border-border bg-surface p-5',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
};
