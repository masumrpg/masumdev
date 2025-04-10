import { Svg, Defs, Image as SVGImage, G, ClipPath } from 'react-native-svg';
import { QRImageProps } from '../../types/generator';

const QRImage = ({ children, size, source, baseClip }: QRImageProps) => {
  return (
    <Svg width={size} height={size}>
      {baseClip}
      <Defs>
        <ClipPath id={'image'}>
          <G>{children}</G>
        </ClipPath>
      </Defs>

      <SVGImage
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMaxYMax slice"
        {...source}
        clipPath="url(#image)"
      />
    </Svg>
  );
};

export { QRImage };
