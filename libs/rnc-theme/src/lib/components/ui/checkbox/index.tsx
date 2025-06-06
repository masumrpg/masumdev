import React, { createContext, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { useTheme } from '../../../context/ThemeContext';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../types/theme';
import { Check } from 'lucide-react-native';

type CheckboxSize = 'sm' | 'md' | 'lg';
type CheckboxVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type CheckboxShape = 'square' | 'round';

interface CheckboxGroupProps {
  children: React.ReactNode;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface CheckboxProps {
  value: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  shape?: CheckboxShape;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface CheckboxIndicatorProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface CheckboxIconProps {
  icon?: React.ReactNode;
  style?: ViewStyle;
}

interface CheckboxLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

// Context untuk CheckboxGroup
interface CheckboxGroupContextType {
  value: string[];
  onValueChange: (value: string[]) => void;
  disabled: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

const useCheckboxGroup = () => {
  return useContext(CheckboxGroupContext);
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  value = [],
  onValueChange,
  disabled = false,
  style,
  ...props
}) => {
  const styles = useThemedStyles(createCheckboxGroupStyles);

  const contextValue: CheckboxGroupContextType = {
    value,
    onValueChange: onValueChange || (() => { /* no-op */ }),
    disabled,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <View style={[styles.group, style]} {...props}>
        {children}
      </View>
    </CheckboxGroupContext.Provider>
  );
};

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  checked: controlledChecked,
  onCheckedChange,
  size = 'md',
  variant = 'default',
  shape = 'square',
  disabled: checkboxDisabled = false,
  style,
  children,
  ...props
}) => {
  const styles = useThemedStyles(createCheckboxStyles);
  const groupContext = useCheckboxGroup();

  // Animation values
  const scale = useSharedValue(1);
  const checkProgress = useSharedValue(0);
  const backgroundProgress = useSharedValue(0);

  // Determine if checkbox is checked
  const isChecked = groupContext
    ? groupContext.value.includes(value)
    : controlledChecked || false;

  // Determine if checkbox is disabled
  const isDisabled = groupContext ? groupContext.disabled : checkboxDisabled;

  // Update animations when checked state changes
  React.useEffect(() => {
    checkProgress.value = withSpring(isChecked ? 1 : 0, {
      damping: 15,
      stiffness: 200,
    });
    backgroundProgress.value = withTiming(isChecked ? 1 : 0, {
      duration: 200,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const handlePress = () => {
    if (isDisabled) return;

    // Scale animation on press
    scale.value = withSpring(0.95, { duration: 100 }, () => {
      scale.value = withSpring(1, { duration: 100 });
    });

    if (groupContext) {
      const newValue = isChecked
        ? groupContext.value.filter(v => v !== value)
        : [...groupContext.value, value];
      groupContext.onValueChange(newValue);
    } else if (onCheckedChange) {
      onCheckedChange(!isChecked);
    }
  };

  // Animated styles
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedCheckboxStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      backgroundProgress.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );

    // Get the variant color
    const variantColors = {
      default: styles.primaryBackground.backgroundColor,
      primary: styles.primaryBackground.backgroundColor,
      success: styles.successBackground.backgroundColor,
      warning: styles.warningBackground.backgroundColor,
      error: styles.errorBackground.backgroundColor,
    };

    return {
      backgroundColor: backgroundColor > 0.5 ? variantColors[variant] : 'transparent',
    };
  });

  const animatedCheckStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      checkProgress.value,
      [0, 0.5, 1],
      [0, 1.2, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      checkProgress.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const checkboxStyle = [
    styles.checkbox,
    styles[size],
    styles[variant],
    styles[shape],
    isDisabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={[styles.container, styles[`${size}Container`]]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      <Animated.View style={[animatedContainerStyle]}>
        <Animated.View style={[checkboxStyle, animatedCheckboxStyle]}>
          {/* Animated check icon */}
          <Animated.View style={[styles.iconContainer, animatedCheckStyle]}>
            <CheckboxIcon size={size} variant={variant} />
          </Animated.View>
        </Animated.View>
      </Animated.View>

      {children && (
        <CheckboxLabel disabled={isDisabled} size={size}>
          {children}
        </CheckboxLabel>
      )}
    </TouchableOpacity>
  );
};

const CheckboxIndicator: React.FC<CheckboxIndicatorProps & {
  checked?: boolean;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
}> = ({
  children,
  style,
  checked = false,
  size = 'md',
  variant = 'default',
  ...props
}) => {
  const styles = useThemedStyles(createCheckboxIndicatorStyles);

  if (!checked) return null;

  return (
    <View
      style={[
        styles.indicator,
        styles[size],
        styles[variant],
        style,
      ]}
      {...props}
    >
      {children || <Check size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} color="white" />}
    </View>
  );
};

const CheckboxIcon: React.FC<CheckboxIconProps & {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
}> = ({
  icon,
  style,
  size = 'md',
  variant = 'default',
  ...props
}) => {
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 16 : 20;
  const iconColor = 'white';

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]} {...props}>
      {icon || <Check size={iconSize} color={iconColor} />}
    </View>
  );
};

const CheckboxLabel: React.FC<CheckboxLabelProps & {
  disabled?: boolean;
  size?: CheckboxSize;
}> = ({
  children,
  style,
  disabled = false,
  size = 'md',
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createCheckboxLabelStyles);

  return (
    <Text
      style={[
        styles.label,
        styles[size],
        disabled && styles.disabled,
        {
          color: disabled ? theme.colors.textSecondary : theme.colors.text,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const createCheckboxGroupStyles = (theme: Theme) => ({
  group: {
    gap: theme.spacing.sm,
  },
});

const createCheckboxStyles = (theme: Theme) => ({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
  },
  checkbox: {
    borderWidth: 2,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: 'transparent',
    position: 'relative' as const,
    marginRight: theme.spacing.sm,
  },
  background: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  iconContainer: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  // Shapes
  square: {
    borderRadius: theme.borderRadius.sm,
  },
  round: {
    borderRadius: 50, // Large radius for circular shape
  },
  // Variants
  default: {
    borderColor: theme.colors.border,
  },
  primary: {
    borderColor: theme.colors.primary,
  },
  success: {
    borderColor: theme.colors.success,
  },
  warning: {
    borderColor: '#F59E0B',
  },
  error: {
    borderColor: theme.colors.error,
  },
  // Background variants
  defaultBackground: {
    backgroundColor: theme.colors.primary,
  },
  primaryBackground: {
    backgroundColor: theme.colors.primary,
  },
  successBackground: {
    backgroundColor: theme.colors.success,
  },
  warningBackground: {
    backgroundColor: '#F59E0B',
  },
  errorBackground: {
    backgroundColor: theme.colors.error,
  },
  // Sizes - Perfect squares/circles
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 22,
    height: 22,
  },
  lg: {
    width: 26,
    height: 26,
  },
  // Container sizes - Proper alignment
  smContainer: {
    minHeight: 32,
    paddingVertical: 4,
  },
  mdContainer: {
    minHeight: 36,
    paddingVertical: 6,
  },
  lgContainer: {
    minHeight: 40,
    paddingVertical: 8,
  },
});

const createCheckboxIndicatorStyles = (theme: Theme) => ({
  indicator: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: theme.borderRadius.sm,
  },
  // Variants
  default: {
    backgroundColor: theme.colors.primary,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  warning: {
    backgroundColor: '#F59E0B',
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  // Sizes
  sm: {
    width: 18,
    height: 18,
  },
  md: {
    width: 22,
    height: 22,
  },
  lg: {
    width: 26,
    height: 26,
  },
});

const createCheckboxLabelStyles = (theme: Theme) => ({
  label: {
    fontWeight: '400' as const,
    flex: 1,
    textAlignVertical: 'center' as const,
  },
  disabled: {
    opacity: 0.5,
  },
  // Sizes
  sm: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
  },
  md: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  },
  lg: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
  },
});

export {
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
};

export type {
  CheckboxGroupProps,
  CheckboxProps,
  CheckboxIndicatorProps,
  CheckboxIconProps,
  CheckboxLabelProps,
  CheckboxSize,
  CheckboxVariant,
  CheckboxShape,
};