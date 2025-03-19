import { ImageSourcePropType } from "react-native";

// Types
type ToastType = "info" | "success" | "error";

interface ToastOptions {
  /** Duration in milliseconds before the toast disappears. Default is 4000ms. */
  duration?: number;
  /** Animation duration in milliseconds. Default is 400ms. */
  animationDuration?: number;
}

interface ToastRef {
  /** Show a toast with a message, type, and optional configuration. */
  show: (message: string, type: ToastType, options?: ToastOptions) => void;
  /** Hide the toast, with an optional callback after hiding. */
  hide: (callback?: () => void) => void;
}

interface ToastConfig {
  text?: string;
  type?: ToastType;
  visible: boolean;
  duration: number;
  animationDuration: number;
}

/** The main Toast component. This should be rendered once in your app. */
interface ToastComponentProps {
  defaultDuration?: number;
  defaultAnimationDuration?: number;
  customIcons?: {
    success?: ImageSourcePropType;
    error?: ImageSourcePropType;
    info?: ImageSourcePropType;
  };
  customColors?: {
    success?: { background: string; text: string };
    error?: { background: string; text: string };
    info?: { background: string; text: string };
  };
}

interface ToastProps {
  showToast: (
    message: string,
    type?: ToastType,
    options?: ToastOptions
  ) => void;
  hideToast: (callback?: () => void) => void;
}

interface ToasterComponentProps extends ToastComponentProps {}

export type {
  ToastType,
  ToastOptions,
  ToastRef,
  ToastConfig,
  ToastComponentProps,
  ToastProps,
  ToasterComponentProps,
};