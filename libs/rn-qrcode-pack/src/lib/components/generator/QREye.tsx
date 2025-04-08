import { G, Circle, Path } from 'react-native-svg';
import { EyeCornerRadius, EyeLayerRadius, EyeOptions } from '../../types/generator';

type QREyeProps = {
  x: number;
  y: number;
  cellSize: number;
  eyeOptions: EyeOptions;
  defaultColor: string;
  defaultBackgroundColor: string;
  keyPrefix: string;
};

const normalizeRadius = (r: EyeLayerRadius = 0): EyeCornerRadius => {
  if (r === null || r === undefined) {
    return { tl: 0, tr: 0, br: 0, bl: 0 };
  }
  return typeof r === 'number'
    ? { tl: r, tr: r, br: r, bl: r }
    : {
        tl: r.tl || 0,
        tr: r.tr || 0,
        br: r.br || 0,
        bl: r.bl || 0,
      };
};

const roundedRectPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: EyeCornerRadius = {}
) => {
  const { tl = 0, tr = 0, br = 0, bl = 0 } = r;

  const validTL = isFinite(tl) ? tl : 0;
  const validTR = isFinite(tr) ? tr : 0;
  const validBR = isFinite(br) ? br : 0;
  const validBL = isFinite(bl) ? bl : 0;

  return `
    M${x + validTL},${y}
    H${x + w - validTR}
    A${validTR},${validTR} 0 0 1 ${x + w},${y + validTR}
    V${y + h - validBR}
    A${validBR},${validBR} 0 0 1 ${x + w - validBR},${y + h}
    H${x + validBL}
    A${validBL},${validBL} 0 0 1 ${x},${y + h - validBL}
    V${y + validTL}
    A${validTL},${validTL} 0 0 1 ${x + validTL},${y}
    Z
  `;
};

export const QREye = ({
  x,
  y,
  cellSize,
  eyeOptions,
  defaultColor,
  defaultBackgroundColor,
  keyPrefix,
}: QREyeProps) => {
  const {
    shape = 'square',
    color: eyeColor = defaultColor,
    backgroundColor: eyeBg = defaultBackgroundColor,
    radiusOuter = 0,
    radiusInner = 0,
    radiusCenter = 0,
  } = eyeOptions;

  const rOuter = normalizeRadius(radiusOuter);
  const rInner = normalizeRadius(radiusInner);
  const rCenter = normalizeRadius(radiusCenter);

  const center = {
    x: x + cellSize * 3.5,
    y: y + cellSize * 3.5,
  };

  return shape === 'circle' ? (
    <G key={keyPrefix}>
      <Circle
        cx={center.x}
        cy={center.y}
        r={cellSize * 3.5}
        fill={eyeColor}
      />
      <Circle cx={center.x} cy={center.y} r={cellSize * 2.5} fill={eyeBg} />
      <Circle
        cx={center.x}
        cy={center.y}
        r={cellSize * 1.5}
        fill={eyeColor}
      />
    </G>
  ) : (
    <G key={keyPrefix}>
      <Path
        d={roundedRectPath(x, y, 7 * cellSize, 7 * cellSize, rOuter)}
        fill={eyeColor}
      />
      <Path
        d={roundedRectPath(
          x + cellSize,
          y + cellSize,
          5 * cellSize,
          5 * cellSize,
          rInner
        )}
        fill={eyeBg}
      />
      <Path
        d={roundedRectPath(
          x + cellSize * 2,
          y + cellSize * 2,
          3 * cellSize,
          3 * cellSize,
          rCenter
        )}
        fill={eyeColor}
      />
    </G>
  );
};