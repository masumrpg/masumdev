import { ReactNode } from "react";
import { AnimatedScrollViewProps, SharedValue } from "react-native-reanimated";

type BackDropProps = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  backDropColor: string;
  close: () => void;
};

interface BottomSheetScrollViewProps extends AnimatedScrollViewProps {
  snapTo: string;
  maxSnapTo?: string;
  backgroundColor: string;
  backDropColor: string;
  onStateChange?: (isOpen: boolean) => void;
}

interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
  isOpen?: boolean;
}

interface BottomSheetContextType {
  isOpen: boolean;
  isLoading: boolean;
  expand: (
    snapToValue?:
      | "10%"
      | "20%"
      | "30%"
      | "40%"
      | "50%"
      | "60%"
      | "70%"
      | "80%"
      | "90%"
  ) => void;
  close: () => void;
  toggle: (snapToValue?: string) => void;
  setContent: (content: ReactNode) => void;
  setSheetTitle: (title: string) => void;
  setSnapTo: (value: string) => void;
}

interface BottomSheetProviderProps {
  children: ReactNode;
  defaultSnapTo?: string;
  maxSnapTo?: string;
  backgroundColor?: string;
  backDropColor?: string;
  onStateChange?: (isOpen: boolean) => void;
}


export type { BackDropProps, BottomSheetScrollViewProps, BottomSheetMethods, BottomSheetContextType, BottomSheetProviderProps };