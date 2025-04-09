import { QRCodeErrorCorrectionLevel } from 'qrcode';

type EyeCornerRadius = {
  tl?: number;
  tr?: number;
  br?: number;
  bl?: number;
};

type EyeLayerRadius = number | EyeCornerRadius;

type EyeOptions = {
  shape?: 'square' | 'circle' | 'dot';
  color?: string;
  innerColor?: string;
  backgroundColor?: string;
  radiusOuter?: EyeLayerRadius;
  radiusInner?: EyeLayerRadius;
  radiusCenter?: EyeLayerRadius;
  dotSizeRatio?: number;
};

type PieceOptions = {
  shape?: 'square' | 'circle' | 'rounded';
  color?: string;
  size?: number; // Size multiplier relative to cell size (1 = full size)
  opacity?: number;
  borderRadius?: number; // For 'rounded' shape or square with rounded corners
};

type LogoOptions = {
  source: number | string;
  size?: number; // Size as percentage of total QR code size (0.0-1.0)
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  padding?: number; // Padding inside logo background
};

type QRCodeGradientConfig = Omit<
  QRGradientProps,
  'width' | 'height' | 'children'
> & {
  maskLogo?: boolean;
  direction?: GradientDirection;
};

type ImageSource = string | ReturnType<typeof require>;

type QRImageProps = {
  children: React.ReactNode;
  size: number;
  imageUri: ImageSource;
  imageSize?: number;
};

type QRCodeVersion = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type ImageOptions = QRImageProps;

type QRCodeGeneratorProps = {
  value: string;
  size?: number;
  color?: string;
  gradient?: QRCodeGradientConfig;
  logo?: LogoOptions;
  image?: ImageOptions;
  backgroundColor?: string;
  piece?: PieceOptions;
  eye?: Partial<{
    topLeft: EyeOptions;
    topRight: EyeOptions;
    bottomLeft: EyeOptions;
  }>;
  includeBackground?: boolean;
  version?: QRCodeVersion;
  maxVersion?: QRCodeVersion;
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
};

type GradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

type GradientDirection =
  | 'to-right'
  | 'to-left'
  | 'to-bottom'
  | 'to-top'
  | 'to-bottom-right'
  | 'to-bottom-left'
  | 'to-top-right'
  | 'to-top-left';

type LinearProps = {
  type: 'linear';
  direction?: GradientDirection;
  x1?: string;
  y1?: string;
  x2?: string;
  y2?: string;
  stops: GradientStop[];
};

type RadialProps = {
  type: 'radial';
  cx?: string;
  cy?: string;
  r?: string;
  fx?: string;
  fy?: string;
  stops: GradientStop[];
};

type QRGradientProps = {
  width: number;
  height: number;
  id?: string;
  children: React.ReactNode;
  onGradientIdGenerated?: (gradientId: string) => void;
} & (LinearProps | RadialProps);

type QREyeProps = {
  x: number;
  y: number;
  cellSize: number;
  eyeOptions: EyeOptions;
  defaultColor: string;
  defaultBackgroundColor: string;
  keyPrefix: string;
  asMask?: boolean;
};

export type {
  EyeCornerRadius,
  EyeLayerRadius,
  EyeOptions,
  PieceOptions,
  LogoOptions,
  QRCodeGradientConfig,
  QRCodeGeneratorProps,
  GradientStop,
  GradientDirection,
  LinearProps,
  RadialProps,
  QRGradientProps,
  QREyeProps,
  QRCodeVersion,
  QRImageProps,
  ImageOptions,
  ImageSource,
  QRCodeErrorCorrectionLevel,
};
