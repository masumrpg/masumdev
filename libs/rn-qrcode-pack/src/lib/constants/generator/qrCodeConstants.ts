// Color name to hex mapping for common colors
export const COLOR_MAP = {
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

// Export the default prop values and other constants for external use if needed
export const QRCodeGeneratorDefaults = {
  COLOR_MAP,
  defaultSize: 200,
  defaultErrorCorrectionLevel: 'M' as const,
  defaultQuietZone: 0,
  defaultTheme: 'light' as const,
};
