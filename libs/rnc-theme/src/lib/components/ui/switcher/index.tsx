import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  Animated,
  Easing,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';

type SwitcherSize = 'sm' | 'md' | 'lg';
type SwitcherVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface SwitcherProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  size?: SwitcherSize;
  variant?: SwitcherVariant;
  disabled?: boolean;
  style?: ViewStyle;
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: string;
  animated?: boolean;
}

interface SwitcherLabelProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  style?: ViewStyle;
}

const Switcher: React.FC<SwitcherProps> = ({
  value, // ✅ State sekarang wajib dari luar
  onValueChange,
  size = 'md',
  variant = 'default',
  disabled = false,
  style,
  trackColor,
  thumbColor,
  animated = true,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createSwitcherStyles);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  // ✅ Sync animatedValue dengan prop value dari luar
  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: value ? 1 : 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(value ? 1 : 0);
    }
  }, [value, animated, animatedValue]);

  const handlePress = () => {
    if (disabled || !onValueChange) return;
    onValueChange(!value); // ✅ Hanya trigger callback, state dikelola parent
  };

  // ✅ Fungsi warna yang selalu sinkron dengan prop value
  const getTrackColor = () => {
    if (disabled) return theme.colors.border;
    if (value) {
      if (trackColor?.true) return trackColor.true;
      switch (variant) {
        case 'primary': return theme.colors.primary;
        case 'success': return theme.colors.success;
        case 'warning': return theme.colors.warning;
        case 'error': return theme.colors.error;
        default: return theme.colors.primary;
      }
    }
    return trackColor?.false || theme.colors.border;
  };

  const getThumbColor = () => {
    if (thumbColor) return thumbColor;
    return disabled ? theme.colors.textSecondary : '#FFFFFF';
  };

  const trackStyle = [
    styles.track,
    styles[size],
    {
      backgroundColor: getTrackColor(), // ✅ Selalu update berdasarkan prop value
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, styles[size].width - styles[`${size}Thumb`].width - 2],
  });

  const thumbStyle = [
    styles.thumb,
    styles[`${size}Thumb`],
    {
      backgroundColor: getThumbColor(),
      transform: [{ translateX: thumbTranslateX }],
    },
  ];

  return (
    <TouchableOpacity
      style={trackStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Animated.View style={thumbStyle} />
    </TouchableOpacity>
  );
};

const SwitcherLabel: React.FC<SwitcherLabelProps> = ({
  children,
  position = 'right',
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createSwitcherLabelStyles);

  return (
    <View style={[styles.label, styles[position], style]} {...props}>
      {children}
    </View>
  );
};

const createSwitcherStyles = (theme: Theme) => ({
  track: {
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center' as const,
    position: 'relative' as const,
  },
  thumb: {
    borderRadius: theme.borderRadius.full,
    position: 'absolute' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  // Sizes
  sm: {
    width: 32,
    height: 18,
  },
  md: {
    width: 44,
    height: 24,
  },
  lg: {
    width: 56,
    height: 30,
  },
  // Thumb sizes
  smThumb: {
    width: 14,
    height: 14,
    top: 2,
  },
  mdThumb: {
    width: 20,
    height: 20,
    top: 2,
  },
  lgThumb: {
    width: 26,
    height: 26,
    top: 2,
  },
});

const createSwitcherLabelStyles = (theme: Theme) => ({
  label: {
    justifyContent: 'center' as const,
  },
  left: {
    marginRight: theme.spacing.sm,
  },
  right: {
    marginLeft: theme.spacing.sm,
  },
});

export {
  Switcher,
  SwitcherLabel,
  type SwitcherProps,
  type SwitcherLabelProps,
};