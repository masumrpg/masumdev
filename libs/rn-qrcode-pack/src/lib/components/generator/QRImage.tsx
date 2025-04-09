import { View } from 'react-native';
import { Svg, Defs, Mask, Image as SvgImage, G } from 'react-native-svg';
import { ImageSource, QRImageProps } from '../../types/generator';

const resolveImageSource = (imageUri: ImageSource) => {
  if (typeof imageUri === 'string') {
    return { uri: imageUri };
  }
  return imageUri;
};

const QRImage = ({
  children,
  size,
  imageUri,
  imageSize = 256,
}: QRImageProps) => {
  const resolvedImage = resolveImageSource(imageUri);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <Mask id="qr-mask">
            <G>
              {children}
            </G>
          </Mask>
        </Defs>

        <SvgImage
          width={imageSize}
          height={imageSize}
          href={resolvedImage}
          preserveAspectRatio="xMidYMid slice"
          mask="url(#qr-mask)"
        />
      </Svg>
    </View>
  );
};

export {QRImage};
