/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { View, Text, BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BottomSheetScrollView from '../components/BottomSheetScrollView';
import BottomSheetFlatList from '../components/BottomSheetFlatList';
import {
  BottomSheetContextType,
  BottomSheetMethods,
  BottomSheetProviderProps,
} from '../types';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// Create Context with Default Value
const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

/**
 * BottomSheetProvider component that manages the bottom sheet state and behavior.
 * Now supports both ScrollView and FlatList variants.
 */
export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
  defaultSnapTo = '70%',
  maxSnapTo = '100%',
  backgroundColor = '#FFFFFF',
  backDropColor = 'rgba(0,0,0,0.5)',
  onStateChange,
  variant = 'scroll',
  flatListProps,
}) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [title, setSheetTitle] = useState<string>('');
  const [snapTo, setSnapTo] = useState<string>(defaultSnapTo);
  const [sheetVariant, setSheetVariant] = useState<'scroll' | 'flatlist'>(
    variant
  );

  const [listData, setListData] = useState<any[]>([]);
  const [renderItem, setRenderItem] = useState<any>(null);
  const navigation = useNavigation();

  // Remove isLoading state which causes delays and unnecessary re-renders

  // Expand method with optional snapTo parameter
  const expand = useCallback((snapToValue?: string) => {
    if (snapToValue) {
      setSnapTo(snapToValue);
    }

    // Use requestAnimationFrame to avoid Reanimated warnings
    // and ensure the state is updated before expanding
    requestAnimationFrame(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.expand();
      }
    });
  }, []);

  // Close method
  const close = useCallback(() => {
    requestAnimationFrame(() => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
      }
    });
  }, []);

  // Handler for State Change from Bottom Sheet
  const handleStateChange = useCallback(
    (state: boolean) => {
      setIsOpen(state);
      onStateChange?.(state);

      // Reset title when bottom sheet is closed
      if (!state) {
        setSheetTitle('');
        setContent(null);
      }
    },
    [onStateChange]
  );

  // Toggle bottom sheet with optional snapTo parameter
  const toggle = useCallback(
    (snapToValue?: string) => {
      if (isOpen) {
        close();
      } else {
        expand(snapToValue);
      }
    },
    [isOpen, close, expand]
  );

  // Content setting functions with useCallback to prevent recreating functions
  const handleSetContent = useCallback((newContent: ReactNode) => {
    setContent(newContent);
  }, []);

  const handleSetSheetTitle = useCallback((newTitle: string) => {
    setSheetTitle(newTitle);
  }, []);

  const handleSetSnapTo = useCallback((newValue: string) => {
    setSnapTo(newValue);
  }, []);

  const handleSetVariant = useCallback((newVariant: 'scroll' | 'flatlist') => {
    setSheetVariant(newVariant);
  }, []);

  const handleSetListData = useCallback((data: any[]) => {
    setListData(data || []); // Add null check to prevent empty data
  }, []);

  const handleSetRenderItem = useCallback(
    (renderer: (info: any) => ReactNode) => {
      // Wrap the provided renderer with null checks

      const safeRenderer = (info: any) => {
        // If info or info.item is null/undefined, return null or a placeholder
        if (!info || info.item === null || info.item === undefined) {
          return null;
        }
        // Otherwise use the original renderer
        return renderer(info);
      };

      setRenderItem(() => safeRenderer);
    },
    []
  );

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
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
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (!isOpen) return; // Don't handle if sheet is not open

        // Prevent immediate navigation
        e.preventDefault();

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
    expand,
    close,
    toggle,
    setContent: handleSetContent,
    setSheetTitle: handleSetSheetTitle,
    setSnapTo: handleSetSnapTo,
    variant: sheetVariant,
    setVariant: handleSetVariant,
    setListData: handleSetListData,
    setRenderItem: handleSetRenderItem,
    isLoading: false,
  };

  // Title container component
  const TitleContainer = () =>
    title ? (
      <View
        style={{
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600' }}>{title}</Text>
      </View>
    ) : null;

  // Add safeguard for renderItem in case it's still null
  const safeRenderItem =
    renderItem ||
    (({ item }: { item: any }) => (
      <Text style={{ padding: 20 }}>No item renderer provided</Text>
    ));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetContext.Provider value={contextValue}>
        {children}
        {sheetVariant === 'scroll' ? (
          <BottomSheetScrollView
            ref={bottomSheetRef}
            snapTo={snapTo}
            maxSnapTo={maxSnapTo}
            backgroundColor={backgroundColor}
            backDropColor={backDropColor}
            onStateChange={handleStateChange}
          >
            <View style={{ minHeight: 300 }}>
              <TitleContainer />
              <View style={{ padding: 20 }}>{content}</View>
            </View>
          </BottomSheetScrollView>
        ) : (
          <BottomSheetFlatList
            ref={bottomSheetRef}
            snapTo={snapTo}
            maxSnapTo={maxSnapTo}
            backgroundColor={backgroundColor}
            backDropColor={backDropColor}
            onStateChange={handleStateChange}
            data={listData}
            renderItem={safeRenderItem}
            ListHeaderComponent={
              <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                <TitleContainer />
                {content}
              </View>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
            {...flatListProps}
          />
        )}
      </BottomSheetContext.Provider>
    </GestureHandlerRootView>
  );
};

/**
 * Custom hook to access the Bottom Sheet Context.
 * Supports both ScrollView and FlatList variants.
 */
export const useBottomSheet = (
  snapToValue?: string
): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);

  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }

  // Set snapTo if parameter is provided when hook is called
  useEffect(() => {
    if (snapToValue) {
      context.setSnapTo(snapToValue);
    }
  }, [snapToValue, context]);

  return context;
};
