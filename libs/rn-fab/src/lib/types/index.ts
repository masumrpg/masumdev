import { StyleProp, ViewStyle } from "react-native";

/** Item type for Clustered FAB variant with label */
type FabClusteredItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  component: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
  /** Label text to display next to the FAB */
  label: string;
};

/** Props for Clustered FAB component */
export type FabClusteredProps = {
  /** Array of 1-3 FAB items to be displayed in clustered layout */
  items: [FabClusteredItem, FabClusteredItem?, FabClusteredItem?];
  /** Theme variant for the FAB */
  theme?: 'dark' | 'light';
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Item type for Doted FAB variant */
type FabDotedItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  component: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
};

/** Props for Doted FAB component */
export type FabDotedProps = {
  /** Array of 1-3 FAB items to be displayed in doted layout */
  items: [FabDotedItem, FabDotedItem?, FabDotedItem?];
  /** Theme variant for the FAB */
  theme?: 'dark' | 'light';
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Item type for Extended FAB variant with label */
type FabExtendedItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  component: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
  /** Label text to display next to the FAB */
  label: string;
};

/** Props for Extended FAB component */
export type FabExtendedProps = {
  /** Array of 1-3 FAB items to be displayed in extended layout */
  items: [FabExtendedItem, FabExtendedItem?, FabExtendedItem?];
  /** Theme variant for the FAB */
  theme?: 'dark' | 'light';
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Props for Single FAB component */
export type FabSingleProps = {
  /** Optional icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  component?: React.ReactNode;
  /** Optional callback function when FAB is pressed */
  onPress?: () => void;
  /** Theme variant for the FAB */
  theme?: 'dark' | 'light';
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
};

/** Item type for Stacked FAB variant */
type FabStackedItem = {
  /** Icon component from lucide-react-native, react-native-vector-icons, or React Native <Image/> component */
  component: React.ReactNode;
  /** Callback function when FAB is pressed */
  onPress: () => void;
};

/** Props for Stacked FAB component */
export type FabStackedProps = {
  /** Array of 1-3 FAB items to be displayed in stacked layout */
  items: [FabStackedItem, FabStackedItem?, FabStackedItem?];
  /** Theme variant for the FAB */
  theme?: 'dark' | 'light';
  /** Custom styles for the FAB */
  style?: StyleProp<ViewStyle>;
  /** Callback for FAB open/close state changes */
  isOpen?: (prev: boolean) => void;
  /** Optional custom plus icon component */
  plusIcon?: React.ReactNode;
  /** Custom styles for the FAB container */
  containerStyle?: StyleProp<ViewStyle>;
};

/** Available FAB variants */
export type FabVariant = 'clustered' | 'doted' | 'extended' | 'single' | 'stacked';

/** Union type of all FAB variant props */
export type FabProps =
  | ({ variant: 'clustered' } & FabClusteredProps)
  | ({ variant: 'doted' } & FabDotedProps)
  | ({ variant: 'extended' } & FabExtendedProps)
  | ({ variant: 'single' } & FabSingleProps)
  | ({ variant: 'stacked' } & FabStackedProps);