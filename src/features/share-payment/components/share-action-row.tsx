import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '@/shared/components/app-text';

import { ShareActionIcon } from './share-action-icon';

type ShareActionRowProps = {
  icon: ComponentProps<typeof ShareActionIcon>['name'];
  label: string;
} & Omit<ComponentProps<typeof Pressable>, 'children'>;

export const ShareActionRow = ({
  icon,
  label,
  ...props
}: ShareActionRowProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      className="min-h-16 flex-row items-center gap-4 rounded-2xl border border-border bg-surface-muted px-5 active:border-primary active:bg-surface"
      {...props}
    >
      <View className="w-5 items-center">
        <ShareActionIcon name={icon} size={20} />
      </View>
      <AppText className="flex-1 text-lg" color="primary">
        {label}
      </AppText>
    </Pressable>
  );
};
