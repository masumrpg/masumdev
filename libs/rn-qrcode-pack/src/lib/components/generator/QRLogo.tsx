import { G, Rect, Image } from 'react-native-svg';
import { LogoOptions } from '../../types/generator';

type QRLogoProps = {
  logo: LogoOptions;
  size: number;
  matrix: number[][];
};

export const QRLogo = ({ logo, size, matrix }: QRLogoProps) => {
  if (!logo || !logo.source) return null;

  const {
    source,
    size: logoSizePercentage = 0.2,
    backgroundColor: logoBgColor = '#FFFFFF',
    borderRadius = 0,
    borderColor = 'transparent',
    borderWidth = 0,
    padding = 0,
  } = logo;

  // Calculate sizes
  const logoSize = Math.min(size * logoSizePercentage, size * 0.3);
  const backgroundSize = logoSize + padding * 2;
  const totalSize = backgroundSize + borderWidth * 2;

  // Center position
  const centerX = (size - totalSize) / 2;
  const centerY = (size - totalSize) / 2;

  // Adjust the matrix to create a clearing for the logo
  const clearZone = () => {
    const centerQR = Math.floor(matrix.length / 2);
    const clearRadius = Math.ceil(((totalSize / size) * matrix.length) / 2);

    // Clear matrix cells in logo area
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        const distX = Math.abs(x - centerQR);
        const distY = Math.abs(y - centerQR);
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < clearRadius) {
          matrix[y][x] = 0;
        }
      }
    }
  };

  // Only clear if we have a matrix
  if (matrix.length > 0) {
    clearZone();
  }

  return (
    <G>
      {/* Logo background */}
      <Rect
        x={centerX}
        y={centerY}
        width={totalSize}
        height={totalSize}
        fill={borderColor}
        rx={borderRadius}
        ry={borderRadius}
      />

      {/* Inner background with padding */}
      <Rect
        x={centerX + borderWidth}
        y={centerY + borderWidth}
        width={backgroundSize}
        height={backgroundSize}
        fill={logoBgColor}
        rx={Math.max(0, borderRadius - borderWidth)}
        ry={Math.max(0, borderRadius - borderWidth)}
      />

      {/* Logo image */}
      <Image
        x={centerX + borderWidth + padding}
        y={centerY + borderWidth + padding}
        width={logoSize}
        height={logoSize}
        href={source}
        preserveAspectRatio="xMidYMid slice"
      />
    </G>
  );
};