import type { ComponentProps } from 'react';
import { Linking, Pressable } from 'react-native';

import { AppText } from './app-text';

type LinkTextProps = {
  children: string;
  href: string;
} & Omit<ComponentProps<typeof Pressable>, 'children' | 'onPress'>;

export const LinkText = ({ children, href, ...props }: LinkTextProps) => {
  const openLink = () => {
    void Linking.openURL(href);
  };

  return (
    <Pressable accessibilityRole="link" onPress={openLink} {...props}>
      <AppText color="primary" fontWeight="semibold" size="md">
        {children}
      </AppText>
    </Pressable>
  );
};
