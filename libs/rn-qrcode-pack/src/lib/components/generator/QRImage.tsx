import { Svg, Defs, Mask, Rect, G } from 'react-native-svg';
import { QRImageProps } from '../../types/generator';

const QRImage = ({
  children,
  size,
  source,
  imageSize = size,
}: QRImageProps) => {
  const imageX = (size - imageSize) / 2;
  const imageY = (size - imageSize) / 2;
  const maskId = 'qr-mask';

  return (
    <Svg width={size} height={size}>
      <Defs>
        <Mask id={maskId}>
          <G fill="white">{children}</G>
        </Mask>
      </Defs>

      {/* Gambar menggunakan komponen SVG yang disediakan */}
      <G x={imageX} y={imageY} width={imageSize} height={imageSize}>
        {source}
      </G>

      {/* Overlay dengan QR code mask */}
      <Rect width={size} height={size} fill="black" mask={`url(#${maskId})`} />
    </Svg>
  );
};

export { QRImage };
