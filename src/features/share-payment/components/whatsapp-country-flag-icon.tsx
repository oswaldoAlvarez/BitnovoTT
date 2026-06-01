import { Circle, ClipPath, Defs, G, Path, Svg } from 'react-native-svg';

import type { WhatsAppCountryCode } from '@/features/share-payment/model/whatsapp-countries';

type WhatsAppCountryFlagIconProps = {
  code: WhatsAppCountryCode;
  size?: number;
};

export const WhatsAppCountryFlagIcon = ({
  code,
  size = 24,
}: WhatsAppCountryFlagIconProps) => {
  return (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
      <Defs>
        <ClipPath id="roundFlag">
          <Circle cx="12" cy="12" r="12" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#roundFlag)">
        {code === 'AR' && (
          <>
            <Path d="M0 0h24v24H0z" fill="#74ACDF" />
            <Path d="M0 8h24v8H0z" fill="#FFFFFF" />
            <Circle cx="12" cy="12" fill="#F6B40E" r="2.2" />
          </>
        )}
        {code === 'ES' && (
          <>
            <Path d="M0 0h24v24H0z" fill="#AA151B" />
            <Path d="M0 6h24v12H0z" fill="#F1BF00" />
          </>
        )}
        {code === 'VE' && (
          <>
            <Path d="M0 0h24v24H0z" fill="#CF142B" />
            <Path d="M0 0h24v16H0z" fill="#00247D" />
            <Path d="M0 0h24v8H0z" fill="#F4D00C" />
            <Circle cx="7.6" cy="12.8" fill="#FFFFFF" r="0.7" />
            <Circle cx="9.3" cy="11.8" fill="#FFFFFF" r="0.7" />
            <Circle cx="11.2" cy="11.2" fill="#FFFFFF" r="0.7" />
            <Circle cx="13.1" cy="11.2" fill="#FFFFFF" r="0.7" />
            <Circle cx="15" cy="11.8" fill="#FFFFFF" r="0.7" />
            <Circle cx="16.7" cy="12.8" fill="#FFFFFF" r="0.7" />
          </>
        )}
      </G>
    </Svg>
  );
};
