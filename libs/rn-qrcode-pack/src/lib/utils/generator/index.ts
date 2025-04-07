import { COLOR_MAP } from "../../constants/generator/qrCodeConstants";
import { ColorMap } from "../../types/generator";

/**
 * Converts a color name to its hex representation
 *
 * @param {string} color - Color name or existing color code
 * @returns {string | undefined} - Hex color code or original value if not a known color name
 */
export const convertColorToHex = (color: string | undefined): string | undefined => {
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
export const isValidHexColor = (color: string): boolean => {
  // Validate hex colors (3 or 6 digits with optional # prefix)
  return /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);
};