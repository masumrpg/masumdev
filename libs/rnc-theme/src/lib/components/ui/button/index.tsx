import React from 'react';
import {
  Pressable,
  TouchableOpacity,
  ViewStyle,
  PressableProps,
  TouchableOpacityProps,
  View,
  TextStyle,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Theme } from '../../../types/theme';
import { useTheme } from '../../../context/ThemeContext';
import { LucideProps, Plus } from 'lucide-react-native';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonComponent = 'pressable' | 'touchable';

interface BaseButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  borderRadius?: keyof Theme['borderRadius'];
  fullWidth?: boolean;
  component?: ButtonComponent;
}

type ButtonProps = BaseButtonProps & (PressableProps | TouchableOpacityProps);


type IconPosition = 'left' | 'right' | 'center';

interface ButtonIconProps {
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  position?: IconPosition;
  marginLeft?: keyof Theme['spacing'];
  marginRight?: keyof Theme['spacing'];
}

interface ButtonTextProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: TextStyle;
  showLoadingIndicator?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  borderRadius = 'md',
  fullWidth = false,
  component = 'pressable',
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantStyles = (): {
    backgroundColor: string;
    borderColor: string;
  } => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      case 'success':
        return {
          backgroundColor: theme.colors.success,
          borderColor: theme.colors.success,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error,
          borderColor: theme.colors.error,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          borderColor: theme.colors.warning,
        };
      case 'info':
        return {
          backgroundColor: theme.colors.info,
          borderColor: theme.colors.info,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
    }
  };

  const getSizeStyles = (): { padding: number } => {
    switch (size) {
      case 'sm':
        return {
          padding: theme.spacing.sm,
        };
      case 'md':
        return {
          padding: theme.spacing.md,
        };
      case 'lg':
        return {
          padding: theme.spacing.lg,
        };
      default:
        return {
          padding: theme.spacing.md,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const buttonStyle: ViewStyle = {
    backgroundColor: disabled
      ? theme.colors.border
      : variantStyles.backgroundColor,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: disabled ? theme.colors.border : variantStyles.borderColor,
    borderRadius: theme.borderRadius[borderRadius],
    padding: sizeStyles.padding,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : undefined,
    flexDirection: 'row',
  };

  // Define specific types for component props
  type PressableComponentProps = {
    disabled: boolean;
    style: (state: { pressed: boolean }) => ViewStyle[];
  } & Omit<PressableProps, 'disabled' | 'style'>;

  type TouchableComponentProps = {
    disabled: boolean;
    activeOpacity: number;
    style: ViewStyle[];
  } & Omit<TouchableOpacityProps, 'disabled' | 'style' | 'activeOpacity'>;

  const ButtonComponent =
    component === 'pressable' ? Pressable : TouchableOpacity;

  const componentProps: PressableComponentProps | TouchableComponentProps =
    component === 'pressable'
      ? ({
          disabled: disabled || loading,
          style: ({ pressed }: { pressed: boolean }) => [
            buttonStyle,
            pressed && { opacity: 0.7 },
            style,
          ],
          ...(props as PressableProps),
        } as PressableComponentProps)
      : ({
          disabled: disabled || loading,
          activeOpacity: 0.7,
          style: [buttonStyle, style],
          ...(props as TouchableOpacityProps),
        } as TouchableComponentProps);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <ButtonComponent {...(componentProps as any)}>{children}</ButtonComponent>
  );
};

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  position = 'center',
  marginLeft,
  marginRight,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantIconColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'success':
      case 'error':
      case 'warning':
      case 'info':
        return '#FFFFFF';
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getSizeStyles = (): { iconSize: number } => {
    switch (size) {
      case 'sm':
        return {
          iconSize: 16,
        };
      case 'md':
        return {
          iconSize: 20,
        };
      case 'lg':
        return {
          iconSize: 24,
        };
      default:
        return {
          iconSize: 20,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const iconColor = disabled
    ? theme.colors.textSecondary
    : getVariantIconColor();

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: marginLeft ? theme.spacing[marginLeft] : undefined,
    marginRight: marginRight ? theme.spacing[marginRight] : undefined,
  };

  // Default icon jika tidak ada icon yang diberikan
  const defaultIcon = <Plus size={sizeStyles.iconSize} color={iconColor} />;

  // Clone icon dengan props yang sesuai jika icon adalah React element
  const renderIcon = () => {
    if (!icon) {
      return defaultIcon;
    }

    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<LucideProps>, {
        size: sizeStyles.iconSize,
        color: iconColor,
        ...((icon as React.ReactElement<LucideProps>).props || {}),
      });
    }

    return icon;
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {renderIcon()}
    </View>
  );
};

const ButtonText: React.FC<ButtonTextProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  showLoadingIndicator = true,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'success':
      case 'error':
      case 'warning':
      case 'info':
        return '#FFFFFF';
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getSizeStyles = (): { fontSize: number } => {
    switch (size) {
      case 'sm':
        return {
          fontSize: theme.typography.small.fontSize,
        };
      case 'md':
        return {
          fontSize: theme.typography.body.fontSize,
        };
      case 'lg':
        return {
          fontSize: theme.typography.subtitle.fontSize,
        };
      default:
        return {
          fontSize: theme.typography.body.fontSize,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const textColor = disabled
    ? theme.colors.textSecondary
    : getVariantTextColor();

  const textStyle: TextStyle = {
    color: textColor,
    fontSize: sizeStyles.fontSize,
    fontWeight: '600',
    textAlign: 'center',
  };

  if (loading && showLoadingIndicator) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ActivityIndicator
          size="small"
          color={textColor}
          style={{ marginRight: theme.spacing.xs }}
        />
        <Text style={[textStyle, style]} {...props}>
          {children}
        </Text>
      </View>
    );
  }

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export {
  Button, ButtonIcon, ButtonText
};

export type {
  ButtonProps, ButtonIconProps, ButtonTextProps
}