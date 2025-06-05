import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';

type TypographyVariant = 'small' | 'body' | 'subtitle' | 'title' | 'heading';
type TypographyWeight = '400' | '500' | '600' | '700' | 'bold' | 'normal';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: string;
  align?: TypographyAlign;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  selectable?: boolean;
  onPress?: () => void;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight,
  color,
  align = 'left',
  style,
  numberOfLines,
  ellipsizeMode,
  selectable = false,
  onPress,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantStyles = (): TextStyle => {
    const typography = theme.typography[variant];
    return {
      fontSize: typography.fontSize,
      lineHeight: typography.lineHeight,
      fontWeight: weight || typography.fontWeight || '400',
    };
  };

  const textStyle: TextStyle = {
    ...getVariantStyles(),
    color: color || theme.colors.text,
    textAlign: align,
  };

  return (
    <Text
      style={[textStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
      onPress={onPress}
      {...props}
    >
      {children}
    </Text>
  );
};

// Komponen khusus untuk setiap variant
const Heading: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="heading" weight="700" {...props} />
);

const Title: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="title" weight="600" {...props} />
);

const Subtitle: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="subtitle" weight="500" {...props} />
);

const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

const Small: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="small" {...props} />
);

// Komponen untuk teks dengan warna semantik
const TextPrimary: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.primary} {...props} />;
};

const TextSecondary: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.textSecondary} {...props} />;
};

const TextError: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.error} {...props} />;
};

const TextSuccess: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.success} {...props} />;
};

const TextWarning: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.warning} {...props} />;
};

const TextInfo: React.FC<Omit<TypographyProps, 'color'>> = (props) => {
  const { theme } = useTheme();
  return <Typography color={theme.colors.info} {...props} />;
};

export {
  Typography,
  Heading,
  Title,
  Subtitle,
  Body,
  Small,
  TextPrimary,
  TextSecondary,
  TextError,
  TextSuccess,
  TextWarning,
  TextInfo,
};

export type {
  TypographyProps,
  TypographyVariant,
  TypographyWeight,
  TypographyAlign,
};