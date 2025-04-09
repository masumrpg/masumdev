import { G, Circle, Path, Defs, Mask, Rect } from 'react-native-svg';
import { QREyeProps } from '../../types/generator';
import { normalizeRadius, roundedRectPath } from '../../utils/generator';

export const QREye = ({
  x,
  y,
  cellSize,
  eyeOptions,
  defaultColor,
  defaultBackgroundColor,
  keyPrefix,
  asMask = false,
}: QREyeProps) => {
  const color = asMask ? 'white' : defaultColor;

  const {
    shape = 'square',
    color: eyeColor = color,
    innerColor: innerEyeColor = eyeColor,
    backgroundColor: eyeBg = defaultBackgroundColor,
    radiusOuter = 0,
    radiusInner = 0,
    radiusCenter = 0,
    dotSizeRatio = 0.5,
  } = eyeOptions;

  const rOuter = normalizeRadius(radiusOuter);
  const rInner = normalizeRadius(radiusInner);
  const rCenter = normalizeRadius(radiusCenter);

  const center = {
    x: x + cellSize * 3.5,
    y: y + cellSize * 3.5,
  };

  if (shape === 'dot') {
    return (
      <G key={keyPrefix}>
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => {
            const cx = x + col * cellSize + cellSize / 2;
            const cy = y + row * cellSize + cellSize / 2;

            const isCenter = row >= 2 && row <= 4 && col >= 2 && col <= 4;
            const isInner = row >= 1 && row <= 5 && col >= 1 && col <= 5;

            const fill = isCenter ? innerEyeColor : isInner ? eyeBg : eyeColor;

            const radius = cellSize * dotSizeRatio;

            if (isInner && !isCenter) {
              const isInnerCorner =
                (row === 1 && col === 1) ||
                (row === 1 && col === 5) ||
                (row === 5 && col === 1) ||
                (row === 5 && col === 5);
              if (!isInnerCorner) {
                return null;
              }
            }

            return (
              <Circle
                key={`${keyPrefix}-dot-rounded-${row}-${col}`}
                cx={cx}
                cy={cy}
                r={radius}
                fill={asMask ? 'white' : fill}
              />
            );
          })
        )}
      </G>
    );
  }

  return shape === 'circle' ? (
    asMask ? (
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
      <>
        <Defs>
          <Mask id={`cirecle-mask-${keyPrefix}`}>
            <Rect width="100%" height="100%" fill="black" />
            <Circle
              cx={center.x}
              cy={center.y}
              r={cellSize * 3.5}
              fill={'white'}
            />
            <Circle
              cx={center.x}
              cy={center.y}
              r={cellSize * 2.5}
              fill={'black'}
            />
          </Mask>
        </Defs>
        <G mask={`url(#cirecle-mask-${keyPrefix})`}>
          <Rect width="100%" height="100%" fill={eyeColor} />
        </G>
        <G key={keyPrefix}>
          <Circle cx={center.x} cy={center.y} r={cellSize * 2.5} fill={eyeBg} />
          <Circle
            cx={center.x}
            cy={center.y}
            r={cellSize * 1.5}
            fill={innerEyeColor}
          />
        </G>
      </>
    )
  ) : asMask ? (
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
  ) : (
    <>
      <Defs>
        <Mask id={`square-mask-${keyPrefix}`}>
          <Rect width="100%" height="100%" fill="black" />
          <Path
            d={roundedRectPath(x, y, 7 * cellSize, 7 * cellSize, rOuter)}
            fill={'white'}
          />
          <Path
            d={roundedRectPath(
              x + cellSize,
              y + cellSize,
              5 * cellSize,
              5 * cellSize,
              rInner
            )}
            fill={'black'}
          />
        </Mask>
      </Defs>
      <G mask={`url(#square-mask-${keyPrefix})`}>
        <Rect width="100%" height="100%" fill={eyeColor} />
      </G>
      <G key={keyPrefix}>
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
          fill={innerEyeColor}
        />
      </G>
    </>
  );
};
