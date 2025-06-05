import React from 'react';
import { DimensionValue, View, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

interface BaseLayoutProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof Theme['spacing'];
  margin?: keyof Theme['spacing'];
  backgroundColor?: string | keyof Theme['colors'];
  borderRadius?: keyof Theme['borderRadius'];
  flex?: number;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  themed?: boolean; // Apakah menggunakan background theme default
}

interface StackProps extends BaseLayoutProps {
  spacing?: keyof Theme['spacing'];
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
}

type CenterProps = BaseLayoutProps

interface BoxProps extends BaseLayoutProps {
  borderWidth?: number;
  borderColor?: string | keyof Theme['colors'];
  shadowOpacity?: number;
  elevation?: number;
  variant?: 'default' | 'card' | 'surface';
}

// Helper function untuk resolve color dari theme
const resolveColor = (color: string | keyof Theme['colors'] | undefined, theme: Theme, fallback?: string): string | undefined => {
  if (!color) return fallback;
  if (typeof color === 'string' && color.startsWith('#')) return color;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (theme.colors as any)[color] || color;
};

// HStack - Horizontal Stack
const HStack: React.FC<StackProps> = ({
  children,
  style,
  spacing,
  align = 'center',
  justify = 'flex-start',
  wrap = false,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  flex,
  width,
  height,
  themed = true,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createHStackStyles);

  const stackStyle: ViewStyle = {
    ...styles.base,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: spacing ? theme.spacing[spacing] : 0,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(backgroundColor, theme, themed ? theme.colors.background : undefined),
    borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined,
    flex,
    width,
    height,
  };

  return (
    <View style={[stackStyle, style]} {...props}>
      {children}
    </View>
  );
};

// VStack - Vertical Stack
const VStack: React.FC<StackProps> = ({
  children,
  style,
  spacing,
  align = 'stretch',
  justify = 'flex-start',
  wrap = false,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  flex,
  width,
  height,
  themed = true,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createVStackStyles);

  const stackStyle: ViewStyle = {
    ...styles.base,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: spacing ? theme.spacing[spacing] : 0,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(backgroundColor, theme, themed ? theme.colors.background : undefined),
    borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined,
    flex,
    width,
    height,
  };

  return (
    <View style={[stackStyle, style]} {...props}>
      {children}
    </View>
  );
};

// ZStack - Absolute positioned stack
const ZStack: React.FC<BaseLayoutProps> = ({
  children,
  style,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  flex,
  width,
  height,
  themed = true,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createZStackStyles);

  const stackStyle: ViewStyle = {
    ...styles.base,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(backgroundColor, theme, themed ? theme.colors.background : undefined),
    borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined,
    flex,
    width,
    height,
  };

  return (
    <View style={[stackStyle, style]} {...props}>
      {children}
    </View>
  );
};

// Center - Centers content
const Center: React.FC<CenterProps> = ({
  children,
  style,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  flex,
  width,
  height,
  themed = false,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createCenterStyles);

  const centerStyle: ViewStyle = {
    ...styles.base,
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(backgroundColor, theme, themed ? theme.colors.background : undefined),
    borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined,
    flex,
    width,
    height,
  };

  return (
    <View style={[centerStyle, style]} {...props}>
      {children}
    </View>
  );
};

// Box - Themed View component
const Box: React.FC<BoxProps> = ({
  children,
  style,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  shadowOpacity,
  elevation,
  flex,
  width,
  height,
  themed = true,
  variant = 'default',
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createBoxStyles);

  const getVariantStyle = () => {
    switch (variant) {
      case 'card':
        return styles.card;
      case 'surface':
        return styles.surface;
      default:
        return styles.default;
    }
  };

  const boxStyle: ViewStyle = {
    ...styles.base,
    ...getVariantStyle(),
    padding: padding ? theme.spacing[padding] : undefined,
    margin: margin ? theme.spacing[margin] : undefined,
    backgroundColor: resolveColor(backgroundColor, theme, themed ? theme.colors.surface : undefined),
    borderRadius: borderRadius ? theme.borderRadius[borderRadius] : undefined,
    borderWidth: borderWidth || undefined,
    borderColor: resolveColor(borderColor, theme, theme.colors.border),
    shadowOpacity: shadowOpacity || undefined,
    elevation: elevation || undefined,
    flex,
    width,
    height,
  };

  return (
    <View style={[boxStyle, style]} {...props}>
      {children}
    </View>
  );
};

// Styled functions untuk useThemedStyles
const createHStackStyles = (theme: Theme) => ({
  base: {
    flexDirection: 'row' as const,
  },
});

const createVStackStyles = (theme: Theme) => ({
  base: {
    flexDirection: 'column' as const,
  },
});

const createZStackStyles = (theme: Theme) => ({
  base: {
    position: 'relative' as const,
  },
});

const createCenterStyles = (theme: Theme) => ({
  base: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
});

const createBoxStyles = (theme: Theme) => ({
  base: {},
  default: {
    backgroundColor: theme.colors.surface,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  surface: {
    backgroundColor: theme.colors.background,
  },
});

export {
  HStack,
  VStack,
  ZStack,
  Center,
  Box,
  type StackProps,
  type CenterProps,
  type BoxProps,
  type BaseLayoutProps,
};