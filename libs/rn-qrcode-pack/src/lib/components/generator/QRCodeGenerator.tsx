import { Svg, Rect } from 'react-native-svg';
import { QRCodeGeneratorProps } from '../../types/generator';
import { useGenerateQrCode } from '../../hooks/generator';
import { QRLogo } from './QRLogo';
import { QREye } from './QREye';
import { QRPiece } from './QRPiece';
import { QRGradient } from './QRGradient';

export const QRCodeGenerator = ({
  value,
  size = 256,
  piece,
  eye,
  logo,
  color = '#000',
  backgroundColor = 'transparent',
  gradient,
}: QRCodeGeneratorProps) => {
  const matrix = useGenerateQrCode({ value, logo });

  if (matrix.length === 0) {
    return null;
  }

  const cellSize = size / matrix.length;

  const isInEye = (x: number, y: number) => {
    const eyeZone = 7;
    const inTopLeft = x < eyeZone && y < eyeZone;
    const inTopRight = x >= matrix.length - eyeZone && y < eyeZone;
    const inBottomLeft = x < eyeZone && y >= matrix.length - eyeZone;
    return inTopLeft || inTopRight || inBottomLeft;
  };

  if (gradient?.maskLogo) {
    return (
      <Svg
        width={size}
        height={size}
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Background */}
        <Rect width={size} height={size} fill={backgroundColor} />

        {/* QR with Gradient Mask */}
        <QRGradient width={size} height={size} {...gradient}>
          {matrix.map((row, y) =>
            row.map((cell, x) => {
              if (isInEye(x, y)) return null;
              return (
                <QRPiece
                  key={`piece-${x}-${y}`}
                  x={x}
                  y={y}
                  cell={cell}
                  cellSize={cellSize}
                  pieceOptions={piece || {}}
                  defaultColor="white"
                  keyPrefix={`piece-${x}-${y}`}
                  asMask
                />
              );
            })
          )}

          <QREye
            x={0}
            y={0}
            cellSize={cellSize}
            eyeOptions={eye?.topLeft || {}}
            defaultColor="white"
            defaultBackgroundColor="black"
            asMask
            keyPrefix="eye-tl"
          />
          <QREye
            x={size - cellSize * 7}
            y={0}
            cellSize={cellSize}
            eyeOptions={eye?.topRight || {}}
            defaultColor="white"
            defaultBackgroundColor="black"
            asMask
            keyPrefix="eye-tr"
          />
          <QREye
            x={0}
            y={size - cellSize * 7}
            cellSize={cellSize}
            eyeOptions={eye?.bottomLeft || {}}
            defaultColor="white"
            defaultBackgroundColor="black"
            asMask
            keyPrefix="eye-bl"
          />

          {/* Logo masked */}
          {logo && <QRLogo logo={logo} size={size} matrix={matrix} />}
        </QRGradient>
      </Svg>
    );
  }

  return gradient ? (
    <Svg width={size} height={size} style={{ backgroundColor: 'transparent' }}>
      {/* Background */}
      <Rect width={size} height={size} fill={backgroundColor} />

      {/* QR with Gradient Mask */}
      <QRGradient width={size} height={size} {...gradient}>
        {matrix.map((row, y) =>
          row.map((cell, x) => {
            if (isInEye(x, y)) return null;
            return (
              <QRPiece
                key={`piece-${x}-${y}`}
                x={x}
                y={y}
                cell={cell}
                cellSize={cellSize}
                pieceOptions={piece || {}}
                defaultColor="white"
                keyPrefix={`piece-${x}-${y}`}
                asMask
              />
            );
          })
        )}

        <QREye
          x={0}
          y={0}
          cellSize={cellSize}
          eyeOptions={eye?.topLeft || {}}
          defaultColor="white"
          defaultBackgroundColor="black"
          asMask
          keyPrefix="eye-tl"
        />
        <QREye
          x={size - cellSize * 7}
          y={0}
          cellSize={cellSize}
          eyeOptions={eye?.topRight || {}}
          defaultColor="white"
          defaultBackgroundColor="black"
          asMask
          keyPrefix="eye-tr"
        />
        <QREye
          x={0}
          y={size - cellSize * 7}
          cellSize={cellSize}
          eyeOptions={eye?.bottomLeft || {}}
          defaultColor="white"
          defaultBackgroundColor="black"
          asMask
          keyPrefix="eye-bl"
        />
      </QRGradient>

      {/* Logo on top */}
      {logo && <QRLogo logo={logo} size={size} matrix={matrix} />}
    </Svg>
  ) : (
    <Svg width={size} height={size} style={{ backgroundColor: 'transparent' }}>
      <Rect width={size} height={size} fill={backgroundColor} />

      {matrix.map((row, y) =>
        row.map((cell, x) => {
          if (isInEye(x, y)) return null;
          return (
            <QRPiece
              key={`piece-${x}-${y}`}
              x={x}
              y={y}
              cell={cell}
              cellSize={cellSize}
              pieceOptions={piece || {}}
              defaultColor={color}
              keyPrefix={`piece-${x}-${y}`}
            />
          );
        })
      )}

      <QREye
        x={0}
        y={0}
        cellSize={cellSize}
        eyeOptions={eye?.topLeft || {}}
        defaultColor={color}
        defaultBackgroundColor={backgroundColor}
        keyPrefix="eye-tl"
      />
      <QREye
        x={size - cellSize * 7}
        y={0}
        cellSize={cellSize}
        eyeOptions={eye?.topRight || {}}
        defaultColor={color}
        defaultBackgroundColor={backgroundColor}
        keyPrefix="eye-tr"
      />
      <QREye
        x={0}
        y={size - cellSize * 7}
        cellSize={cellSize}
        eyeOptions={eye?.bottomLeft || {}}
        defaultColor={color}
        defaultBackgroundColor={backgroundColor}
        keyPrefix="eye-bl"
      />

      {logo && <QRLogo logo={logo} size={size} matrix={matrix} />}
    </Svg>
  );
};
