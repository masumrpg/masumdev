/**
 * CameraScreenPermission is a component that displays a camera permission request screen
 * with customizable UI elements including theme support, custom text, and styling options.
 *
 * @component
 */
export interface CameraScreenPermissionProps {
  /** Callback function triggered when the allow button is pressed */
  onPress: () => void;
  /** Theme of the permission screen. Defaults to 'light' */
  theme?: 'light' | 'dark';
  /** Main title text. Defaults to 'Allow Camera' */
  title?: string;
  /** Subtitle/description text explaining the permission request */
  subtitle?: string;
  /** Text for the allow permission button. Defaults to 'ALLOW' */
  allowButtonText?: string;
  /** Text for the decline permission button. Defaults to 'NOT NOW' */
  declineButtonText?: string;
  /** Color of the camera icon. Defaults to '#000' */
  iconColor?: string;
  /** Primary color for decorative dots. Defaults to '#FB923C' */
  dotColor1?: string;
  /** Secondary color for decorative dots. Defaults to '#FDBA74' */
  dotColor2?: string;
  /** Primary color for decorative stars. Defaults to '#000' */
  starColor1?: string;
  /** Secondary color for decorative stars. Defaults to '#FF5722' */
  starColor2?: string;
  /** Background color for the allow button. Defaults to '#000' */
  buttonBackgroundColor?: string;
  /** Text color for the allow button. Defaults to '#FFF' */
  buttonTextColor?: string;
  /** Text color for the decline button. Defaults to '#000' */
  declineTextColor?: string;
}
