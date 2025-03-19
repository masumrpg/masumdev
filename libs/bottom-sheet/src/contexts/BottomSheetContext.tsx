import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { View, Text, BackHandler } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Import untuk handle iOS back gesture
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BottomSheetScrollView from "../components/BottomSheetScrollView";
import { BottomSheetContextType, BottomSheetMethods, BottomSheetProviderProps } from "../types";

// Create Context with Default Value
const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);


/**
 * BottomSheetProvider component that manages the bottom sheet state and behavior.
 *
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - Child components to be rendered
 * @param {string} [props.defaultSnapTo="70%"] - Default height of the bottom sheet
 * @param {string} [props.maxSnapTo="90%"] - Maximum height the bottom sheet can expand to
 * @param {string} [props.backgroundColor="#FFFFFF"] - Background color of the bottom sheet
 * @param {string} [props.backDropColor="rgba(0,0,0,0.5)"] - Color of the backdrop overlay
 * @param {(state: boolean) => void} [props.onStateChange] - Callback function when bottom sheet state changes
 *
 * @returns {JSX.Element} The rendered BottomSheetProvider component
 *
 * @example
 * // Basic usage
 * <BottomSheetProvider>
 *   <App />
 * </BottomSheetProvider>
 *
 * @example
 * // With custom props
 * <BottomSheetProvider
 *   defaultSnapTo="50%"
 *   maxSnapTo="80%"
 *   backgroundColor="#F5F5F5"
 *   backDropColor="rgba(0,0,0,0.7)"
 *   onStateChange={(isOpen) => console.log('Sheet is open:', isOpen)}
 * >
 *   <App />
 * </BottomSheetProvider>
 */
export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
  defaultSnapTo = "70%",
  maxSnapTo = "90%",
  backgroundColor = "#FFFFFF",
  backDropColor = "rgba(0,0,0,0.5)",
  onStateChange,
}) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setSheetTitle] = useState<string>("");
  const [snapTo, setSnapTo] = useState<string>(defaultSnapTo);
  const navigation = useNavigation();

  // Initialize component with loading state
  useEffect(() => {
    // Simulate async loading of props
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [defaultSnapTo]);

  // Calling Method Expand from ref, now with optional snapTo parameter
  const expand = useCallback(
    (snapToValue?: string) => {
      if (isLoading) return;

      if (snapToValue) {
        setSnapTo(snapToValue);
      }

      if (bottomSheetRef.current) {
        bottomSheetRef.current.expand();
      }
    },
    [isLoading]
  );

  // Call the close method from ref.
  const close = useCallback(() => {
    if (isLoading) return;

    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, [isLoading]);

  // Handler for State Change from Bottom Sheet
  const handleStateChange = useCallback(
    (state: boolean) => {
      setIsOpen(state);
      onStateChange?.(state);

      // Reset title when bottom sheet is closed
      if (!state) {
        setSheetTitle("");
        setContent(null);
      }
    },
    [onStateChange]
  );

  // Toggle bottom sheet, now with optional snapTo parameter
  const toggle = useCallback(
    (snapToValue?: string) => {
      if (isLoading) return;

      if (isOpen) {
        close();
      } else {
        expand(snapToValue);
      }
    },
    [isOpen, close, expand, isLoading]
  );

  // Safe set content function that respects loading state
  const handleSetContent = useCallback((newContent: ReactNode) => {
    setContent(newContent);
  }, []);

  // Safe set title function that respects loading state
  const handleSetSheetTitle = useCallback((newTitle: string) => {
    setSheetTitle(newTitle);
  }, []);

  // Safe set snapTo function that respects loading state
  const handleSetSnapTo = useCallback((newValue: string) => {
    setSnapTo(newValue);
  }, []);

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isOpen) {
          close();
          return true; // Prevents default back behavior
        }
        return false; // Allows default back behavior
      }
    );

    return () => backHandler.remove();
  }, [isOpen, close]);

  // Handle iOS back gesture using React Navigation
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        if (!isOpen) return; // Don't handle if sheet is not open

        // Close bottom sheet
        close();

        // Allow parent removal only when bottom sheet closes
        const timeout = setTimeout(() => {
          if (navigation.isFocused()) {
            navigation.dispatch(e.data.action);
          }
        }, 300); // Give enough time for sheet to close

        return () => clearTimeout(timeout);
      });

      return unsubscribe;
    }, [navigation, isOpen, close])
  );

  // Value provided by Context
  const contextValue: BottomSheetContextType = {
    isOpen,
    isLoading,
    expand,
    close,
    toggle,
    setContent: handleSetContent,
    setSheetTitle: handleSetSheetTitle,
    setSnapTo: handleSetSnapTo,
  };

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetContext.Provider value={contextValue}>
          {children}
        </BottomSheetContext.Provider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetContext.Provider value={contextValue}>
        {children}
        <BottomSheetScrollView
          ref={bottomSheetRef}
          snapTo={snapTo}
          maxSnapTo={maxSnapTo}
          backgroundColor={backgroundColor}
          backDropColor={backDropColor}
          onStateChange={handleStateChange}
        >
          <View style={{ minHeight: 300 }}>
            {title && (
              <View style={{
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#E5E5E5',
                alignItems: 'center'
              }}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>{title}</Text>
              </View>
            )}
            <View style={{ padding: 20 }}>{content}</View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  );
};

/**
 * Custom hook to access the Bottom Sheet Context with an optional parameter for snapTo.
 *
 * @param {string} [snapToValue] - Optional value to set the bottom sheet height
 * @returns {BottomSheetContextType} Object containing functions and state to control the bottom sheet
 * @property {boolean} isOpen - Status indicating whether the bottom sheet is open
 * @property {boolean} isLoading - Status indicating whether the bottom sheet is in a loading state
 * @property {(snapToValue?: string) => void} expand - Function to open the bottom sheet with a specific height
 * @property {() => void} close - Function to close the bottom sheet
 * @property {(snapToValue?: string) => void} toggle - Function to toggle (open/close) the bottom sheet
 * @property {(content: ReactNode) => void} setContent - Function to set the bottom sheet content
 * @property {(title: string) => void} setSheetTitle - Function to set the bottom sheet title
 * @property {(value: string) => void} setSnapTo - Function to set the bottom sheet height
 *
 * @example
 * // Example usage with the snapTo parameter
 * const bottomSheet = useBottomSheet("50%");
 *
 * // Or use the default value
 * const bottomSheet = useBottomSheet();
 *
 * // Open the bottom sheet with a specific height
 * const handleOpenSheet = () => {
 *   bottomSheet.expand();
 * };
 *
 * @example
 * // Example usage with content and title
 * const { expand, setContent, setSheetTitle, isLoading } = useBottomSheet("80%");
 *
 * const showProfile = () => {
 *   if (isLoading) return;
 *
 *   setSheetTitle("Profile Details");
 *   setContent(
 *     <View>
 *       <Text>Name: John Doe</Text>
 *       <Button title="Close" onPress={close} />
 *     </View>
 *   );
 *   expand();
 * };
 *
 * @example
 * // Example usage with snapTo parameter directly in expand
 * const { expand, setContent, isLoading } = useBottomSheet();
 *
 * const showHalfSheet = () => {
 *   if (isLoading) return;
 *
 *   setContent(<Text>Half Sheet Content</Text>);
 *   expand("50%"); // Override snapTo only for this call
 * };
 *
 * @throws {Error} If used outside of BottomSheetProvider
 */
export const useBottomSheet = (
  snapToValue?: string
): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  const [isInitialized, setIsInitialized] = useState(false);

  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }

  // Set snapTo jika parameter diberikan saat hook dipanggil
  useEffect(() => {
    if (snapToValue && !context.isLoading && !isInitialized) {
      context.setSnapTo(snapToValue);
      setIsInitialized(true);
    }
  }, [snapToValue, context, isInitialized, context.isLoading]);

  return context;
};
