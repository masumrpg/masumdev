import { Circle, Rect } from 'react-native-svg';
import { PieceOptions } from '../../types/generator';

type QRPieceProps = {
  x: number;
  y: number;
  cell: number;
  cellSize: number;
  pieceOptions: PieceOptions;
  defaultColor: string;
  keyPrefix: string;
};

export const QRPiece = ({
  x,
  y,
  cell,
  cellSize,
  pieceOptions,
  defaultColor,
  keyPrefix,
}: QRPieceProps) => {
  if (!cell) return null;

  const {
    shape = 'square',
    color: pieceColor = defaultColor,
    size: pieceSize = 1,
    opacity = 1,
    borderRadius = 0,
  } = pieceOptions;

  const adjustedSize = cellSize * pieceSize;
  const centerOffset = (cellSize - adjustedSize) / 2;
  const posX = x * cellSize + centerOffset;
  const posY = y * cellSize + centerOffset;

  switch (shape) {
    case 'circle':
      return (
        <Circle
          key={keyPrefix}
          cx={posX + adjustedSize / 2}
          cy={posY + adjustedSize / 2}
          r={adjustedSize / 2}
          fill={pieceColor}
          opacity={opacity}
        />
      );
    case 'rounded':
      return (
        <Rect
          key={keyPrefix}
          x={posX}
          y={posY}
          width={adjustedSize}
          height={adjustedSize}
          rx={borderRadius}
          ry={borderRadius}
          fill={pieceColor}
          opacity={opacity}
        />
      );
    case 'square':
    default:
      return (
        <Rect
          key={keyPrefix}
          x={posX}
          y={posY}
          width={adjustedSize}
          height={adjustedSize}
          rx={borderRadius}
          ry={borderRadius}
          fill={pieceColor}
          opacity={opacity}
        />
      );
  }
};