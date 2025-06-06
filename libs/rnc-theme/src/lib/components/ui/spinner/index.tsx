import React, { useEffect, useRef } from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string | keyof Theme['colors'];
  style?: ViewStyle;
  thickness?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  style,
  thickness = 2,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createSpinnerStyles);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const spinRotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getSize = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return 16;
      case 'md': return 24;
      case 'lg': return 32;
      default: return 24;
    }
  };

  const resolveColor = (color: string | keyof Theme['colors'] | undefined): string => {
    if (!color) return theme.colors.primary;
    if (typeof color === 'string' && color.startsWith('#')) return color;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (theme.colors as any)[color] || color;
  };

  const spinnerSize = getSize();
  const spinnerColor = resolveColor(color);

  return (
    <View style={[styles.container, style]} {...props}>
      <Animated.View
        style={[
          styles.spinner,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderWidth: thickness,
            borderColor: `${spinnerColor}20`,
            borderTopColor: spinnerColor,
            borderRadius: spinnerSize / 2,
            transform: [{ rotate: spinRotation }],
          },
        ]}
      />
    </View>
  );
};

const createSpinnerStyles = (_: Theme) => ({
  container: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  spinner: {
    borderStyle: 'solid' as const,
  },
});

export {
  Spinner,
  type SpinnerProps,
};