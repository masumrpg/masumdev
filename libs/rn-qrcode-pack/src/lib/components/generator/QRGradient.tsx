import React from 'react';
import {
  Svg,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Mask,
  G,
} from 'react-native-svg';

type GradientStop = {
  offset: string;
  color: string;
  opacity?: number;
};

type LinearProps = {
  type: 'linear';
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

export const QRGradient = ({
  width,
  height,
  id = 'qrGradient',
  children,
  onGradientIdGenerated,
  ...gradientProps
}: QRGradientProps) => {
  const gradientId = id;
  const maskId = `${id}-mask`;

  React.useEffect(() => {
    if (onGradientIdGenerated) {
      onGradientIdGenerated(gradientId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onGradientIdGenerated]);

  return (
    <Svg width={width} height={height}>
      <Defs>
        {/* Gradient */}
        {gradientProps.type === 'linear' ? (
          <LinearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={gradientProps.x1 ?? '0'}
            y1={gradientProps.y1 ?? '0'}
            x2={gradientProps.x2 ?? String(width)}
            y2={gradientProps.y2 ?? '0'}
          >
            {gradientProps.stops.map((stop, i) => (
              <Stop
                key={i}
                offset={stop.offset}
                stopColor={stop.color}
                stopOpacity={stop.opacity ?? 1}
              />
            ))}
          </LinearGradient>
        ) : (
          <RadialGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            cx={gradientProps.cx ?? String(width / 2)}
            cy={gradientProps.cy ?? String(height / 2)}
            r={gradientProps.r ?? String(Math.min(width, height) / 2)}
            fx={gradientProps.fx ?? gradientProps.cx ?? String(width / 2)}
            fy={gradientProps.fy ?? gradientProps.cy ?? String(height / 2)}
          >
            {gradientProps.stops.map((stop, i) => (
              <Stop
                key={i}
                offset={stop.offset}
                stopColor={stop.color}
                stopOpacity={stop.opacity ?? 1}
              />
            ))}
          </RadialGradient>
        )}

        {/* ✅ Mask: NORMAL behavior */}
        <Mask id={maskId}>
          {/* Black background = hidden */}
          <Rect width={width} height={height} fill="black" />
          {/* Children (QR parts) painted white = shown */}
          <G fill="white">{children}</G>
        </Mask>
      </Defs>

      {/* Apply gradient and mask */}
      <Rect
        width={width}
        height={height}
        fill={`url(#${gradientId})`}
        mask={`url(#${maskId})`}
      />
    </Svg>
  );
};
