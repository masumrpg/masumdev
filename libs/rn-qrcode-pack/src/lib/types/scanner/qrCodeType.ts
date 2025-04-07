import { TextStyle, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { CameraScreenPermissionProps } from "./cameraScreenPermission";



/**
 * Represents the result of QR code validation.
 * @interface ValidationResult
 * @property {boolean} valid - Indicates if the QR code is valid.
 * @property {string} message - Validation message or error description.
 * @property {string | null} [code] - The validated QR code value, if available.
 */
export interface ValidationResult {
  valid: boolean;
  message: string;
  code?: string | null;
}

/**
 * Represents the result of QR code validation with optional fields.
 * @typedef {Object} QRCodeValidationResult
 * @property {boolean} valid - Indicates if the QR code is valid.
 * @property {string} [message] - Optional validation message.
 * @property {string} [code] - Optional validated QR code value.
 */
export type QRCodeValidationResult = {
  valid: boolean;
  message?: string;
  code?: string;
};

/**
 * Function type for validating QR codes.
 * @callback QRCodeValidator
 * @param {string} code - The QR code string to validate.
 * @returns {QRCodeValidationResult} The validation result.
 */
export type QRCodeValidator = (code: string) => QRCodeValidationResult;

/**
 * Properties for the scan result callback.
 * @typedef {Object} OnSuccessfulScanProps
 * @property {'success' | 'error'} status - The scan result status.
 * @property {string} message - Description of the scan result.
 * @property {string | null} code - The scanned QR code value.
 */
export type OnSuccessfulScanProps = {
  status: 'success' | 'error';
  message: string;
  code: string | null;
};

/**
 * Styling options for the scanner corners.
 * @typedef {Object} CornerStyle
 * @property {string} color - Color of the corner markers.
 * @property {number} width - Stroke width of the corner markers.
 * @property {number} length - Length of each corner marker.
 */
export type CornerStyle = {
  color: string;
  width: number;
  length: number;
};

/**
 * Styling options for the scanner overlay.
 * @typedef {Object} OverlayStyle
 * @property {string} backgroundColor - Background color of the overlay.
 * @property {number} opacity - Opacity level of the overlay (0-1).
 */
export type OverlayStyle = {
  backgroundColor: string;
  opacity: number;
};

/**
 * Styling options for the scanning frame.
 * @typedef {Object} FrameStyle
 * @property {number} width - Width of the scanning frame.
 * @property {number} height - Height of the scanning frame.
 * @property {number} borderRadius - Border radius of the scanning frame corners.
 */
export type FrameStyle = {
  width: number;
  height: number;
  borderRadius: number;
};

/**
 * Styling options for control buttons.
 * @typedef {Object} ControlButtonStyle
 * @property {string} backgroundColor - Background color of the buttons.
 * @property {number} borderRadius - Border radius of the buttons.
 * @property {number} padding - Padding around the button content.
 * @property {string} iconColor - Color of the button icons.
 * @property {number} iconSize - Size of the button icons.
 */
export type ControlButtonStyle = {
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  iconColor: string;
  iconSize: number;
};

/**
 * Styling options for the status display.
 * @typedef {Object} StatusStyle
 * @property {string} backgroundColor - Background color of the status display.
 * @property {string} textColor - Color of the status text.
 * @property {number} borderRadius - Border radius of the status display.
 * @property {number} padding - Padding around the status text.
 * @property {'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'} fontWeight - Font weight of the status text.
 */
export type StatusStyle = {
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  padding: number;
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

/**
 * Navigation configuration options.
 * @typedef {Object} NavigationOptions
 * @property {() => void} [onBackPress] - Callback function when back button is pressed.
 * @property {boolean} [showBackButton] - Whether to show the back button.
 * @property {keyof typeof Ionicons.glyphMap} [backButtonIcon] - Icon to use for the back button.
 */
export type NavigationOptions = {
  onBackPress?: () => void;
  showBackButton?: boolean;
  backButtonIcon?: keyof typeof Ionicons.glyphMap;
};

/**
 * Props for the QRCodeScanner component with nested configuration objects.
 * @interface QRCodeScannerProps
 *
 * @property {Object} core - Core functionality configuration
 * @property {(state: OnSuccessfulScanProps) => void} core.onSuccessfulScan - Callback when scan is successful
 * @property {QRCodeValidator} [core.validate] - Optional function to validate scanned codes
 *
 * @property {Object} [scanning] - Scanning behavior configuration
 * @property {number} [scanning.cooldownDuration] - Cooldown time between scans in milliseconds
 * @property {Object} [scanning.scanningArea] - Target area configuration for scanning
 * @property {number} [scanning.scanningArea.targetX] - X coordinate of scan target
 * @property {number} [scanning.scanningArea.targetY] - Y coordinate of scan target
 * @property {number} [scanning.scanningArea.tolerance] - Tolerance range for scan target
 *
 * @property {Object} [uiControls] - UI controls configuration
 * @property {boolean} [uiControls.showControls] - Whether to show control buttons
 * @property {boolean} [uiControls.showStatus] - Whether to show status display
 * @property {boolean} [uiControls.showTorchButton] - Whether to show torch toggle button
 *
 * @property {Object} [appearance] - Visual appearance configuration
 * @property {'light' | 'dark'} [appearance.theme] - Color theme
 * @property {OverlayStyle} [appearance.overlayStyle] - Styling for scanner overlay
 * @property {FrameStyle} [appearance.frameStyle] - Styling for scanning frame
 * @property {CornerStyle} [appearance.cornerStyle] - Styling for corner markers
 * @property {ControlButtonStyle} [appearance.controlButtonStyle] - Styling for control buttons
 * @property {StatusStyle} [appearance.statusStyle] - Styling for status display
 *
 * @property {Object} [callbacks] - Additional callback functions
 * @property {(isOn: boolean) => void} [callbacks.onTorchChange] - Called when torch state changes
 * @property {() => void} [callbacks.onScanStart] - Called when scanning starts
 * @property {() => void} [callbacks.onScanEnd] - Called when scanning ends
 * @property {(duration: number) => void} [callbacks.onCooldownStart] - Called when cooldown starts
 * @property {() => void} [callbacks.onCooldownEnd] - Called when cooldown ends
 *
 * @property {Object} [haptics] - Haptic feedback configuration
 * @property {boolean} [haptics.enableHapticFeedback] - Whether to enable haptic feedback
 * @property {Object} [haptics.customHapticFeedback] - Custom haptic feedback types
 *
 * @property {Object} [permissionScreen] - Camera permission screen configuration
 * @property {React.ComponentType<{onPress: () => void; theme?: 'light' | 'dark'}>} [permissionScreen.component] - Custom permission screen component
 * @property {CameraScreenPermissionProps} [permissionScreen.props] - Props for permission screen
 *
 * @property {NavigationOptions} [navigation] - Navigation configuration
 *
 * @property {Object} [customComponents] - Custom component renderers
 * @property {Function} [customComponents.renderCustomStatus] - Custom status display renderer
 * @property {Function} [customComponents.renderCustomControls] - Custom controls renderer
 *
 * @property {Object} [customStyles] - Custom style overrides
 * @property {ViewStyle} [customStyles.containerStyle] - Style for container view
 * @property {ViewStyle} [customStyles.statusBoxStyle] - Style for status box
 * @property {TextStyle} [customStyles.statusTextStyle] - Style for status text
 */
export interface QRCodeScannerProps {
  // Core functionality
  core: {
    onSuccessfulScan: (state: OnSuccessfulScanProps) => void;
    validate?: QRCodeValidator;
  };

  // Scanning behavior
  scanning?: {
    cooldownDuration?: number;
    scanningArea?: {
      targetX?: number;
      targetY?: number;
      tolerance?: number;
    };
  };

  // UI Controls
  uiControls?: {
    showControls?: boolean;
    showStatus?: boolean;
    showTorchButton?: boolean;
  };

  // Appearance
  appearance?: {
    theme?: 'light' | 'dark';
    overlayStyle?: OverlayStyle;
    frameStyle?: FrameStyle;
    cornerStyle?: CornerStyle;
    controlButtonStyle?: ControlButtonStyle;
    statusStyle?: StatusStyle;
  };

  // Callbacks
  callbacks?: {
    onTorchChange?: (isOn: boolean) => void;
    onScanStart?: () => void;
    onScanEnd?: () => void;
    onCooldownStart?: (duration: number) => void;
    onCooldownEnd?: () => void;
  };

  // Haptic feedback
  haptics?: {
    enableHapticFeedback?: boolean;
    customHapticFeedback?: {
      success?: Haptics.NotificationFeedbackType;
      error?: Haptics.NotificationFeedbackType;
    };
  };

  // Permission screen
  permissionScreen?: {
    component?: React.ComponentType<{
      onPress: () => void;
      theme?: 'light' | 'dark';
    }>;
    props?: CameraScreenPermissionProps;
  };

  // Navigation
  navigation?: NavigationOptions;

  // Custom components
  customComponents?: {
    renderCustomStatus?: (statusInfo: {
      isScanning: boolean;
      isOuterTarget: boolean;
      cooldownTimer: number;
      scannedCount: number;
    }) => React.ReactNode;
    renderCustomControls?: (controls: {
      isTorchOn: boolean;
      toggleTorch: () => void;
      goBack: () => void;
    }) => React.ReactNode;
  };

  // Custom styles
  customStyles?: {
    containerStyle?: ViewStyle;
    statusBoxStyle?: ViewStyle;
    statusTextStyle?: TextStyle;
  };
}