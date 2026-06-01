import { Circle, ClipPath, Defs, G, Path, Svg } from 'react-native-svg';

import type { CurrencyCode } from '@/features/payment/model/currencies';

type CurrencyFlagIconProps = {
  code: CurrencyCode;
  size?: number;
};

const euroStarPositions = [
  [16, 5],
  [21, 6.5],
  [25.5, 10.5],
  [27, 16],
  [25.5, 21],
  [21, 25.5],
  [16, 27],
  [11, 25.5],
  [6.5, 21],
  [5, 16],
  [6.5, 10.5],
  [11, 6.5],
];

export const CurrencyFlagIcon = ({
  code,
  size = 32,
}: CurrencyFlagIconProps) => {
  return (
    <Svg height={size} viewBox="0 0 32 32" width={size}>
      <Defs>
        <ClipPath id="currencyFlagCircle">
          <Circle cx="16" cy="16" r="16" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#currencyFlagCircle)">
        {code === 'EUR' && (
          <>
            <Path d="M0 0h32v32H0z" fill="#0052B4" />
            {euroStarPositions.map(([cx, cy]) => (
              <Circle
                cx={cx}
                cy={cy}
                fill="#FFDA44"
                key={`${cx}-${cy}`}
                r="1"
              />
            ))}
          </>
        )}
        {code === 'GBP' && (
          <>
            <Path d="M0 0h32v32H0z" fill="#0052B4" />
            <Path d="M0 0l32 32M32 0L0 32" stroke="#F0F0F0" strokeWidth="7" />
            <Path d="M0 0l32 32M32 0L0 32" stroke="#D80027" strokeWidth="3" />
            <Path d="M0 12h32v8H0zM12 0h8v32h-8z" fill="#F0F0F0" />
            <Path d="M0 14h32v4H0zM14 0h4v32h-4z" fill="#D80027" />
          </>
        )}
      </G>
    </Svg>
  );
};
