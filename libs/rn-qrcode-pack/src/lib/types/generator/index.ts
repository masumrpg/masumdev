import { ViewStyle } from "react-native";

/**
 * Color map interface for type safety
 */
export interface ColorMap {
  [colorName: string]: string;
}

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
 * @property {Function} [getRef] - Callback function to receive a reference to the SVG string
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
  getRef?: (svg: string | null) => void;
};
