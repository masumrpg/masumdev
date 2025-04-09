import React from 'react';
import { Svg, Rect } from 'react-native-svg';
import { QRCodeGeneratorProps } from '../../types/generator';
import { useGenerateQrCode } from '../../hooks/generator';
import { QRLogo } from './QRLogo';
import { QREye } from './QREye';
import { QRPiece } from './QRPiece';
import { QRGradient } from './QRGradient';
import { QRBgStyle } from './QRBgStyle';
import { QRImage } from './QRImage';

export const QRCodeGenerator = ({
  value,
  size = 256,
  color = '#000',
  gradient,
  image,
  logo,
  backgroundColor = 'transparent',
  piece,
  eye,
  includeBackground = false,
  version,
  maxVersion,
  errorCorrectionLevel,
}: QRCodeGeneratorProps) => {
  const matrix = useGenerateQrCode({
    value,
    logo,
    version,
    maxVersion,
    errorCorrectionLevel,
  });

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

  const renderSvgContent = (children: React.ReactNode) => {
    const svg = (
      <Svg
        width={size}
        height={size}
        style={{ backgroundColor: 'transparent' }}
      >
        <Rect width={size} height={size} fill={backgroundColor} />
        {children}
      </Svg>
    );

    return includeBackground ? <QRBgStyle>{svg}</QRBgStyle> : svg;
  };

  const renderEyes = (
    defaultColor: string,
    defaultBackgroundColor: string,
    asMask?: boolean
  ) => (
    <>
      <QREye
        x={0}
        y={0}
        cellSize={cellSize}
        eyeOptions={eye?.topLeft || {}}
        defaultColor={defaultColor}
        defaultBackgroundColor={defaultBackgroundColor}
        keyPrefix="eye-tl"
        {...(asMask ? { asMask } : {})}
      />
      <QREye
        x={size - cellSize * 7}
        y={0}
        cellSize={cellSize}
        eyeOptions={eye?.topRight || {}}
        defaultColor={defaultColor}
        defaultBackgroundColor={defaultBackgroundColor}
        keyPrefix="eye-tr"
        {...(asMask ? { asMask } : {})}
      />
      <QREye
        x={0}
        y={size - cellSize * 7}
        cellSize={cellSize}
        eyeOptions={eye?.bottomLeft || {}}
        defaultColor={defaultColor}
        defaultBackgroundColor={defaultBackgroundColor}
        keyPrefix="eye-bl"
        {...(asMask ? { asMask } : {})}
      />
    </>
  );

  const renderPieces = (defaultColor: string, asMask?: boolean) =>
    matrix.map((row, y) =>
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
            defaultColor={defaultColor}
            keyPrefix={`piece-${x}-${y}`}
            {...(asMask ? { asMask } : {})}
          />
        );
      })
    );

  // --- CASE 1: Gradient with maskLogo
  if (gradient?.maskLogo) {
    return renderSvgContent(
      <QRGradient width={size} height={size} {...gradient}>
        {renderPieces('white', true)}
        {renderEyes('white', 'black', true)}
        {logo && <QRLogo logo={logo} size={size} matrix={matrix} />}
      </QRGradient>
    );
  }

  // --- CASE 2: Gradient without mask
  if (gradient) {
    return renderSvgContent(
      <>
        <QRGradient width={size} height={size} {...gradient}>
          {renderPieces('white', true)}
          {renderEyes('white', 'black', true)}
        </QRGradient>
        {logo && <QRLogo logo={logo} size={size} matrix={matrix} />}
      </>
    );
  }

  // --- CASE 3: Image
  if (image) {
    return renderSvgContent(
      <QRImage size={size} source={image.source} imageSize={image.imageSize}>
        {renderPieces('white', true)}
        {renderEyes('white', 'black', true)}
      </QRImage>
    );
  }

  // --- CASE 4: Plain QR (no gradient)
  return renderSvgContent(
    <>
      {renderPieces(color)}
      {renderEyes(color, backgroundColor)}
      {logo && <QRLogo logo={logo} size={size} matrix={matrix} />}
    </>
  );
};
