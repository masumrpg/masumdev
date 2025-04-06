/**
 * A React Native component for generating customizable QR codes.
 *
 * This component generates SVG-based QR codes that can be customized with
 * different colors, sizes, and error correction levels. It supports both
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
import { View, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Color name to hex mapping for common colors
const COLOR_MAP = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#FFFF00',
  purple: '#800080',
  orange: '#FFA500',
  gray: '#808080',
  pink: '#FFC0CB',
  // Add more colors as needed
};

/**
 * Color map interface for type safety
 */
interface ColorMap {
  [colorName: string]: string;
}

/**
 * Converts a color name to its hex representation
 *
 * @param {string} color - Color name or existing color code
 * @returns {string | undefined} - Hex color code or original value if not a known color name
 */
const convertColorToHex = (color: string | undefined): string | undefined => {
  if (!color) return color;

  // If already a hex code, rgb(), rgba(), hsl(), or hsla(), return as is
  if (
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('hsl')
  ) {
    return color;
  }

  // Convert color name to lowercase for case-insensitive matching
  const colorLower = color.toLowerCase();

  // Return hex code for known color name or original value if not found
  return (COLOR_MAP as ColorMap)[colorLower] || color;
};

/**
 * Checks if a color string is a valid hex color
 *
 * @param {string} color - The color string to validate
 * @returns {boolean} - True if the color is a valid hex color
 */
const isValidHexColor = (color: string): boolean => {
  // Validate hex colors (3 or 6 digits with optional # prefix)
  return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);
};

/**
 * Props for the QRCodeGenerator component.
 *
 * @typedef {Object} QRCodeGeneratorProps
 * @property {string} value - The data to encode in the QR code
 * @property {number} [size=200] - The width and height of the QR code in pixels
 * @property {string} [color] - Foreground color of the QR code (defaults based on theme)
 *   Can be any valid CSS color string like:
 *   - Named colors: 'red', 'blue', 'black', 'white', etc.
 *   - Hex values: '#FF5733', '#000', etc.
 *   - RGB/RGBA: 'rgb(255, 0, 0)', 'rgba(0, 0, 255, 0.5)', etc.
 *   - HSL/HSLA: 'hsl(120, 100%, 50%)', 'hsla(240, 100%, 50%, 0.8)', etc.
 * @property {string} [backgroundColor] - Background color of the QR code (defaults based on theme)
 *   Accepts the same color formats as the color property, plus 'transparent' for no background
 *   - Named colors: 'red', 'blue', 'black', 'white', etc.
 *   - Hex values: '#FF5733', '#000', etc.
 *   - RGB/RGBA: 'rgb(255, 0, 0)', 'rgba(0, 0, 255, 0.5)', etc.
 *   - HSL/HSLA: 'hsl(120, 100%, 50%)', 'hsla(240, 100%, 50%, 0.8)', etc.
 *   - 'transparent': Creates a QR code with no background
 * @property {'L'|'M'|'Q'|'H'} [errorCorrectionLevel='M'] - QR code error correction level:
 *   - L: Approx 7% of codewords can be restored
 *   - M: Approx 15% of codewords can be restored
 *   - Q: Approx 25% of codewords can be restored
 *   - H: Approx 30% of codewords can be restored
 * @property {number} [quietZone=0] - Size of the quiet zone (margin) around the QR code
 * @property {ViewStyle} [style] - Additional styles to apply to the container View
 * @property {'light'|'dark'} [theme='light'] - Color theme that determines default colors if not specified
 */
export type QRCodeGeneratorProps = {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  quietZone?: number;
  style?: ViewStyle;
  theme?: 'light' | 'dark';
};

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

// Export the default prop values and other constants for external use if needed
export const QRCodeDefaults = {
  COLOR_MAP,
  defaultSize: 200,
  defaultErrorCorrectionLevel: 'M' as const,
  defaultQuietZone: 0,
  defaultTheme: 'light' as const,
};
