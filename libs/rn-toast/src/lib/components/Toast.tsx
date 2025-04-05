import {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {
  Image,
  LayoutChangeEvent,
  View,
  Text,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { ASSETS, CONTAINER_SIZE, PADDING, SCREEN_WIDTH } from '../constants';
import {
  ToastComponentProps,
  ToastConfig,
  ToastOptions,
  ToastRef,
  ToastType,
} from '../types';
import { styles } from '../styles';
import { ToastManager } from '../managers/ToastManager';

export const Toast = forwardRef<ToastRef, ToastComponentProps>((props, ref) => {
  const {
    defaultDuration = 4000,
    defaultAnimationDuration = 400,
    defaultPosition = 80, // Add default position
    customIcons,
    customColors,
  } = props;

  const [config, setConfig] = useState<ToastConfig>({
    text: undefined,
    type: undefined,
    visible: false,
    duration: defaultDuration,
    animationDuration: defaultAnimationDuration,
    position: defaultPosition, // Add position to config
  });

  const [textWidth, setTextWidth] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);

  // Animated values
  const transY = useSharedValue(-100);
  const toastWidth = useSharedValue(CONTAINER_SIZE);
  const textOpacity = useSharedValue(0);

  // Function to update animation status safely
  const updateAnimationStatus = (status: boolean) => {
    isAnimating.current = status;
    ToastManager.setAnimating(status);
  };

  useImperativeHandle(ref, () => ({
    show: (message: string, type?: ToastType, options?: ToastOptions) => {
      // Skip empty messages
      if (!message || message.trim() === '') {
        updateAnimationStatus(false);
        return;
      }

      const actualType = type || 'info'; // Default to 'info' if type is undefined
      const animationDuration =
        options?.animationDuration || defaultAnimationDuration;
      const duration = options?.duration || defaultDuration;
      const position = options?.position || defaultPosition; // Get position from options

      showToast(message, actualType, animationDuration, duration, position);
    },
    hide: (callback?: () => void) => {
      hideToast(callback);
    },
  }));

  // Register with the global ToastManager
  useEffect(() => {
    const refObject: ToastRef = {
      show: (message: string, type?: ToastType, options?: ToastOptions) => {
        // Skip empty messages
        if (!message || message.trim() === '') {
          updateAnimationStatus(false);
          return;
        }

        const actualType = type || 'info'; // Default to 'info' if type is undefined
        const animationDuration =
          options?.animationDuration || defaultAnimationDuration;
        const duration = options?.duration || defaultDuration;
        const position = options?.position || defaultPosition; // Get position from options

        showToast(message, actualType, animationDuration, duration, position);
      },
      hide: hideToast,
    };

    ToastManager.setToastRef(refObject);

    return () => {
      // Clean up on unmount
      ToastManager.setToastRef(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animation when text width changes
  useEffect(() => {
    if (textWidth > 0 && config.text && config.visible) {
      const totalWidth = Math.min(
        CONTAINER_SIZE + textWidth + PADDING,
        SCREEN_WIDTH - 32
      );

      // Cancel any ongoing animations
      cancelAnimation(toastWidth);
      cancelAnimation(textOpacity);

      toastWidth.value = withDelay(
        config.animationDuration,
        withTiming(totalWidth, { duration: config.animationDuration })
      );

      textOpacity.value = withDelay(
        config.animationDuration * 2,
        withTiming(1, { duration: config.animationDuration })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textWidth, config.text, config.visible, config.animationDuration]);

  // Animated styles
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: transY.value }] as any,
  }));

  const animatedInnerStyle = useAnimatedStyle(() => ({
    width: toastWidth.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  // Measure text width
  const onTextLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    if (width && width !== textWidth) {
      setTextWidth(width);
    }
  };

  function showToast(
    text: string,
    type: ToastType,
    animationDuration: number,
    displayDuration: number,
    position: number // Add position parameter
  ) {
    // Validate text content
    if (!text || text.trim() === '') {
      updateAnimationStatus(false);
      return;
    }

    // Clear any existing timers
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // Cancel any ongoing animations
    cancelAnimation(transY);
    cancelAnimation(toastWidth);
    cancelAnimation(textOpacity);

    // Set animation status
    updateAnimationStatus(true);

    // Reset animation
    toastWidth.value = CONTAINER_SIZE;
    textOpacity.value = 0;

    // Update config
    setConfig({
      text,
      type,
      visible: true,
      duration: displayDuration,
      animationDuration,
      position, // Add position to config
    });

    // Ensure text width is properly measured on next cycle
    setTimeout(() => {
      // Show toast with custom position
      transY.value = withTiming(position, { duration: animationDuration });

      // Auto-hide after duration
      timer.current = setTimeout(() => {
        hideToast();
      }, displayDuration);
    }, 0);
  }

  function hideToast(callback?: () => void) {
    if (!isAnimating.current && transY.value === -100) {
      // Toast is already hidden
      if (callback) callback();
      return;
    }

    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    const animDuration = config.animationDuration;

    // Cancel any ongoing animations
    cancelAnimation(transY);
    cancelAnimation(toastWidth);
    cancelAnimation(textOpacity);

    // Reverse animation
    textOpacity.value = withTiming(0, { duration: animDuration / 2 });

    toastWidth.value = withDelay(
      animDuration / 2,
      withTiming(CONTAINER_SIZE, { duration: animDuration / 2 })
    );

    transY.value = withDelay(
      animDuration,
      withTiming(-100, { duration: animDuration }, () => {
        runOnJS(completeHideAnimation)(callback);
      })
    );
  }

  // Function to handle completion of hide animation
  const completeHideAnimation = (callback?: () => void) => {
    updateAnimationStatus(false);
    resetConfig();
    if (callback) callback();
  };

  function resetConfig() {
    setConfig((prev) => ({
      ...prev,
      text: undefined,
      type: undefined,
      visible: false,
    }));
  }

  // Toast styling helpers
  function getIconSource() {
    if (customIcons && config.type && customIcons[config.type]) {
      return customIcons[config.type];
    }

    switch (config.type) {
      case 'success':
        return ASSETS.success;
      case 'error':
        return ASSETS.error;
      default:
        return ASSETS.info;
    }
  }

  function getBackgroundColor() {
    if (customColors && config.type && customColors[config.type]) {
      return customColors[config.type]!.background;
    }

    switch (config.type) {
      case 'success':
        return '#d8e3d6';
      case 'error':
        return '#d2c5c6';
      default:
        return '#c5c9d2';
    }
  }

  function getTextColor() {
    if (customColors && config.type && customColors[config.type]) {
      return customColors[config.type]!.text;
    }

    switch (config.type) {
      case 'success':
        return '#2a7e1a';
      case 'error':
        return '#ce3f4a';
      default:
        return '#3f82ce';
    }
  }

  // Only render if we have actual text content
  if (!config.text || config.text.trim() === '') {
    return null;
  }

  return (
    <>
      {/* Hidden text measuring component */}
      {config.text && (
        <View style={styles.hiddenTextContainer} pointerEvents="none">
          <Text
            style={{
              color: getTextColor(),
              fontWeight: '500',
              fontSize: 16,
            }}
            onLayout={onTextLayout}
          >
            {config.text}
          </Text>
        </View>
      )}

      {/* Toast component */}
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.View
          style={[
            styles.innerContainer,
            animatedInnerStyle,
            { backgroundColor: getBackgroundColor() },
          ]}
        >
          <Image
            source={getIconSource() as ImageSourcePropType}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Animated.Text
              numberOfLines={1}
              style={[
                {
                  color: getTextColor(),
                  fontWeight: '500',
                  fontSize: 16,
                },
                animatedTextStyle,
              ]}
            >
              {config.text}
            </Animated.Text>
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
});
Toast.displayName = 'Toast';
