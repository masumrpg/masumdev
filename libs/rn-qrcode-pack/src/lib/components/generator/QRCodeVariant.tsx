import React from 'react';
import { QRCodeGenerator } from './QRCodeGenerator';
import type { QRCodeGeneratorProps } from '../../types/generator';
import { QR_CODE_CONFIGS } from '../../constants/generator';
import type { Svg } from 'react-native-svg';

interface QRCodeVariantProps extends Partial<QRCodeGeneratorProps> {
  variant: keyof typeof QR_CODE_CONFIGS;
}

const QRCodeVariant = React.forwardRef<Svg, QRCodeVariantProps>(
  ({ variant, ...overrides }, ref) => {
    const config = QR_CODE_CONFIGS[variant] as QRCodeGeneratorProps;

    return <QRCodeGenerator ref={ref} {...config} {...overrides} />;
  }
);

QRCodeVariant.displayName = 'QRCodeVariant';

export { QRCodeVariant };
