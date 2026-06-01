import Svg, { Path } from 'react-native-svg';

import { appColors } from '@/shared/theme/colors';

import type { IconProps } from './icon.types';

export const ChevronDownIcon = ({
  color = appColors['icon-primary'],
  size = 16,
  strokeWidth = 1.5,
}: IconProps) => {
  return (
    <Svg fill="none" height={size} viewBox="0 0 16 16" width={size}>
      <Path
        d="M13.2802 5.96667L8.93355 10.3133C8.42021 10.8267 7.58021 10.8267 7.06688 10.3133L2.72021 5.96667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};
