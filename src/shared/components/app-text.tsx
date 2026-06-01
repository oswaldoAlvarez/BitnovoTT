import type { PropsWithChildren } from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { cn } from '@/shared/lib/class-names';

type AppTextSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type AppTextColor =
  | 'buttonActive'
  | 'buttonDisabled'
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'surface';
type AppTextFontWeight = 'regular' | 'semibold' | 'bold' | 'extrabold';

type AppTextProps = PropsWithChildren<
  TextProps & {
    className?: string;
    color?: AppTextColor;
    fontWeight?: AppTextFontWeight;
    size?: AppTextSize;
    textAlign?: 'center' | 'left';
  }
>;

const sizeClassNames: Record<AppTextSize, string> = {
  xxs: 'text-[11px] leading-4',
  xs: 'text-xs leading-4',
  sm: 'text-sm leading-5',
  md: 'text-base leading-6',
  lg: 'text-lg leading-7',
  xl: 'text-3xl leading-10',
  xxl: 'text-[40px] leading-10',
};

const colorClassNames: Record<AppTextColor, string> = {
  buttonActive: 'text-button-active-text',
  buttonDisabled: 'text-button-disabled-text',
  default: 'text-text',
  muted: 'text-muted',
  primary: 'text-primary',
  success: 'text-success',
  surface: 'text-surface',
};

const fontWeightClassNames: Record<AppTextFontWeight, string> = {
  regular: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export const AppText = ({
  children,
  className,
  color = 'default',
  fontWeight = 'regular',
  size = 'md',
  textAlign = 'left',
  ...props
}: AppTextProps) => {
  return (
    <Text
      className={cn(
        sizeClassNames[size],
        colorClassNames[color],
        fontWeightClassNames[fontWeight],
        textAlign === 'center' && 'text-center',
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  );
};
