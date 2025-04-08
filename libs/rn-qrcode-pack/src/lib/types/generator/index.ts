type EyeCornerRadius = {
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
};

type EyeLayerRadius = number | EyeCornerRadius;

type EyeOptions = {
  shape?: 'square' | 'circle';
  color?: string;
  backgroundColor?: string;
  radiusOuter?: EyeLayerRadius;
  radiusInner?: EyeLayerRadius;
  radiusCenter?: EyeLayerRadius;
};

type PieceOptions = {
  shape?: 'square' | 'circle' | 'rounded';
  color?: string;
  size?: number; // Size multiplier relative to cell size (1 = full size)
  opacity?: number;
  borderRadius?: number; // For 'rounded' shape or square with rounded corners
};

type LogoOptions = {
  source: string;
  size?: number; // Size as percentage of total QR code size (0.0-1.0)
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  padding?: number; // Padding inside logo background
};

export type {
  EyeCornerRadius,
  EyeLayerRadius,
  EyeOptions,
  PieceOptions,
  LogoOptions,
};

export type QRCodeGeneratorProps = {
  value: string;
  size?: number;
  piece?: PieceOptions;
  eye?: Partial<{
    topLeft: EyeOptions;
    topRight: EyeOptions;
    bottomLeft: EyeOptions;
  }>;
  logo?: LogoOptions;
  color?: string;
  backgroundColor?: string;
};
