export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface ThemeSizes {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Theme {
  colors: ThemeColors;
  sizes: ThemeSizes;
  spacing: ThemeSpacing;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    small: { fontSize: number; lineHeight: number };
    body: { fontSize: number; lineHeight: number };
    subtitle: { fontSize: number; lineHeight: number };
    title: { fontSize: number; lineHeight: number };
    heading: { fontSize: number; lineHeight: number };
  };
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  customTheme?: Partial<Theme>;
}
