import { TextStyle, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

// Convert CameraScreenPermissionProps interface to type
export type CameraScreenPermissionProps = {
  onPress: () => void;
  theme?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  allowButtonText?: string;
  declineButtonText?: string;
  iconColor?: string;
  dotColor1?: string;
  dotColor2?: string;
  starColor1?: string;
  starColor2?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  declineTextColor?: string;
};

export type ValidationResult = {
  valid: boolean;
  message: string;
  code?: string | null;
};

export type QRCodeValidationResult = {
  valid: boolean;
  message?: string;
  code?: string;
};

export type QRCodeValidator = (code: string) => QRCodeValidationResult;

export type OnSuccessfulScanProps = {
  status: 'success' | 'error';
  message: string;
  code: string | null;
};

export type CornerStyle = {
  color: string;
  width: number;
  length: number;
};

export type OverlayStyle = {
  backgroundColor: string;
  opacity: number;
};

export type FrameStyle = {
  width: number;
  height: number;
  borderRadius: number;
};

export type ControlButtonStyle = {
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  iconColor: string;
  iconSize: number;
};

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

export type NavigationOptions = {
  onBackPress?: () => void;
  showBackButton?: boolean;
  backButtonIcon?: keyof typeof Ionicons.glyphMap;
};

// Separate nested objects into individual types
export type CoreProps = {
  onSuccessfulScan: (state: OnSuccessfulScanProps) => void;
  validate?: QRCodeValidator;
};

export type ScanningAreaProps = {
  targetX?: number;
  targetY?: number;
  tolerance?: number;
};

export type ScanningProps = {
  cooldownDuration?: number;
  scanningArea?: ScanningAreaProps;
};

export type UIControlsProps = {
  showControls?: boolean;
  showStatus?: boolean;
  showTorchButton?: boolean;
};

export type AppearanceProps = {
  theme?: 'light' | 'dark';
  overlayStyle?: OverlayStyle;
  frameStyle?: FrameStyle;
  cornerStyle?: CornerStyle;
  controlButtonStyle?: ControlButtonStyle;
  statusStyle?: StatusStyle;
};

export type CallbacksProps = {
  onTorchChange?: (isOn: boolean) => void;
  onScanStart?: () => void;
  onScanEnd?: () => void;
  onCooldownStart?: (duration: number) => void;
  onCooldownEnd?: () => void;
};

export type HapticsProps = {
  enableHapticFeedback?: boolean;
  customHapticFeedback?: {
    success?: Haptics.NotificationFeedbackType;
    error?: Haptics.NotificationFeedbackType;
  };
};

export type PermissionScreenProps = {
  component?: React.ComponentType<{
    onPress: () => void;
    theme?: 'light' | 'dark';
  }>;
  props?: CameraScreenPermissionProps;
};

export type StatusInfo = {
  isScanning: boolean;
  isOuterTarget: boolean;
  cooldownTimer: number;
  scannedCount: number;
};

export type ControlsInfo = {
  isTorchOn: boolean;
  toggleTorch: () => void;
  goBack: () => void;
};

export type CustomComponentsProps = {
  renderCustomStatus?: (statusInfo: StatusInfo) => React.ReactNode;
  renderCustomControls?: (controls: ControlsInfo) => React.ReactNode;
};

export type CustomStylesProps = {
  containerStyle?: ViewStyle;
  statusBoxStyle?: ViewStyle;
  statusTextStyle?: TextStyle;
};

// Main QRCodeScannerProps type with all nested objects separated
export type QRCodeScannerProps = {
  core: CoreProps;
  scanning?: ScanningProps;
  uiControls?: UIControlsProps;
  appearance?: AppearanceProps;
  callbacks?: CallbacksProps;
  haptics?: HapticsProps;
  permissionScreen?: PermissionScreenProps;
  navigation?: NavigationOptions;
  customComponents?: CustomComponentsProps;
  customStyles?: CustomStylesProps;
};