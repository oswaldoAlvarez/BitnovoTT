import QRCode from 'qrcode';
import Svg, { Rect } from 'react-native-svg';

import { appColors } from '@/shared/theme/colors';

type PaymentQrCodeProps = {
  size?: number;
  value: string;
};

const quietZoneSize = 4;

export const PaymentQrCode = ({ size = 230, value }: PaymentQrCodeProps) => {
  const qrCode = QRCode.create(value, { errorCorrectionLevel: 'M' });
  const viewBoxSize = qrCode.modules.size + quietZoneSize * 2;
  const cells = [];

  for (let row = 0; row < qrCode.modules.size; row += 1) {
    for (let column = 0; column < qrCode.modules.size; column += 1) {
      if (qrCode.modules.get(row, column)) {
        cells.push(
          <Rect
            fill={appColors['icon-primary']}
            height="1"
            key={`${row}-${column}`}
            width="1"
            x={column + quietZoneSize}
            y={row + quietZoneSize}
          />,
        );
      }
    }
  }

  return (
    <Svg
      accessibilityLabel="Código QR de pago"
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
    >
      <Rect fill={appColors.surface} height={viewBoxSize} width={viewBoxSize} />
      {cells}
    </Svg>
  );
};
