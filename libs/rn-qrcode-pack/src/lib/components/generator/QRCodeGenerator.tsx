/**
 * A Rea   * This component generates SVG-based QR codes t * different colors, sizes, and error correction levels. It supports both
 * light and dark themes, and allows for transparent backgrounds.
 *

 * @module QRCodeGenerator
 * @requires qrcode
 * @requires react
 * @requires react-native
 * @requires react-native-svg
 */

import QR from 'qrcode';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { QRCodeGeneratorProps } from '../../types/generator';
import { convertColorToHex, isValidHexColor } from '../../utils/generator';

/**
 * Generates a QR code as an SVG image.
 *
 * This component renders a QR code with the specified data and styling options.
 * It uses the qrcode library for generation and react-native-svg for rendering.
 *
 * @param {QRCodeGeneratorProps} props - The component props
 * @param {string} props.value - Data to encode in the QR code
 * @param {number} [props.size=200] - Size of the QR code in pixels
 * @param {string} [props.color] - Custom foreground color (defaults based on theme)
 *   Examples: 'black', 'red', '#FF5733', 'rgb(0, 0, 255)', etc.
 * @param {string} [props.backgroundColor] - Custom background color (defaults based on theme)
 *   Examples: 'white', 'yellow', '#FFFFFF', 'rgba(255, 255, 255, 0.5)', 'transparent', etc.
 * @param {'L'|'M'|'Q'|'H'} [props.errorCorrectionLevel='M'] - Error correction level
 * @param {number} [props.quietZone=0] - Margin around the QR code
 * @param {ViewStyle} [props.style] - Additional container styles
 * @param {'light'|'dark'} [props.theme='light'] - Color theme
 * @param {(svg: string) => void} [props.getRef] - Callback to receive the SVG string
 *
 * @returns {JSX.Element|null} The QR code component or null when generating
 *
 * @example
 * // Basic usage
 * <QRCodeGenerator value="https://example.com" />
 *
 * @example
 * // Using named colors
 * <QRCodeGenerator
 *   value="https://example.com"
 *   color="red"
 *   backgroundColor="white"
 * />
 *
 * @example
 * // Using hex and transparent background
 * <QRCodeGenerator
 *   value="https://example.com"
 *   color="#0000FF"
 *   backgroundColor="transparent"
 * />
 *
 * @example
 * // Fully customized QR code
 * <QRCodeGenerator
 *   value="https://example.com"
 *   size={300}
 *   color="rgb(255, 87, 51)"
 *   backgroundColor="transparent"
 *   errorCorrectionLevel="H"
 *   quietZone={4}
 *   theme="dark"
 * />
 */
export function QRCodeGenerator({
  value,
  size = 200,
  color,
  backgroundColor,
  errorCorrectionLevel = 'M',
  quietZone = 0,
  style,
  theme = 'light',
  getRef,
}: QRCodeGeneratorProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if background should be transparent
  const isTransparent = backgroundColor === 'transparent';

  // Determine foreground and background colors based on theme and props
  const defaultFgColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const defaultBgColor = theme === 'dark' ? '#000000' : '#FFFFFF';

  // Convert color names to hex values if needed
  const fgColorInput = convertColorToHex(color) ?? defaultFgColor;

  // For background color, handle transparency separately
  const bgColorInput = isTransparent
    ? '#00000000' // Temporary color that will be replaced with transparency
    : convertColorToHex(backgroundColor) ?? defaultBgColor;

  // Ensure we have valid hex colors for the QR library
  // For foreground color, we'll ensure it's a valid hex if it starts with #
  const fgColor =
    fgColorInput.startsWith('#') && !isValidHexColor(fgColorInput)
      ? defaultFgColor
      : fgColorInput;

  /**
   * Generate the QR code when dependencies change
   */
  useEffect(() => {
    const generate = async () => {
      try {
        // Reset error state on new generation attempt
        setError(null);

        const svgString = await QR.toString(value, {
          type: 'svg',
          margin: quietZone,
          width: size,
          color: {
            dark: fgColor.startsWith('#') ? fgColor : defaultFgColor, // Ensure hex for QR library
            light: bgColorInput.startsWith('#') ? bgColorInput : defaultBgColor, // Ensure hex for QR library
          },
          errorCorrectionLevel,
        });

        // If transparent background is requested, modify the SVG
        if (isTransparent) {
          // Find the background rectangle in the SVG and make it transparent
          const transparentSvg = svgString.replace(
            /(<rect.+?fill=["'])(.+?)(["'].+?>)/,
            '$1transparent$3'
          );
          setSvg(transparentSvg);
        } else {
          setSvg(svgString);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
        setError('Failed to generate QR code');
      }
    };

    if (value) {
      generate();
    } else {
      setError('QR code value is required');
    }
  }, [
    value,
    size,
    fgColor,
    bgColorInput,
    errorCorrectionLevel,
    quietZone,
    isTransparent,
    defaultFgColor,
    defaultBgColor,
  ]);

  // Add effect to handle getRef callback
  useEffect(() => {
    if (getRef && svg) {
      getRef(svg);
    }
  }, [svg, getRef]);

  // Display error if QR generation failed
  if (error) {
    console.warn(`QRCodeGenerator error: ${error}`);
    return null;
  }

  // Return null while generating
  if (!svg) return null;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgXml xml={svg} width="100%" height="100%" />
    </View>
  );
}
