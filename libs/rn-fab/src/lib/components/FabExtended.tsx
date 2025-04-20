import React, { useMemo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FabExtendedProps } from '../types';

const FabExtended = ({
  items,
  style,
  containerStyle,
  theme = 'light',
  isOpen: setIsOpen,
  plusIcon,
}: FabExtendedProps) => {
  const [width, height, borderRadius, isOpen] = [
    useSharedValue(60),
    useSharedValue(60),
    useSharedValue(50),
    useSharedValue(false),
  ];

  const progress = useDerivedValue(() => {
    'worklet';
    return isOpen.value ? withTiming(1) : withTiming(0);
  });

  const config = useMemo(
    () => ({
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    }),
    []
  );

  const handlePress = () => {
    if (isOpen.value) {
      width.value = withTiming(60, config);
      height.value = withTiming(60, config);
      borderRadius.value = withTiming(50, config);
    } else {
      width.value = withSpring(200);
      height.value = withSpring(250);
      borderRadius.value = withSpring(10);
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  const animatedStyles = {
    container: useAnimatedStyle(() => ({
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
    })),
    plus: useAnimatedStyle(() => ({
      transform: [{ rotate: `${progress.value * 45}deg` }],
    })),
  };

  const backgroundStyle = theme === 'light' ? styles.lightBg : styles.darkBg;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[styles.fabContainer, animatedStyles.container, backgroundStyle, style]}
      >
        <Pressable style={styles.iconContainer} onPress={handlePress}>
          <Animated.View
            style={[styles.iconContainer, animatedStyles.plus, style]}
          >
            {plusIcon || (
              <Image
                source={require('../assets/PlusIcon.png')}
                style={[
                  styles.icon,
                  { tintColor: theme === 'light' ? '#fff' : '#000' },
                ]}
              />
            )}
          </Animated.View>
        </Pressable>

        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contentContainer}
            onPress={() => {
              item?.onPress?.();
              handlePress();
            }}
          >
            <View style={styles.iconContainer}>{item?.icon}</View>
            <Text
              style={[
                styles.text,
                { color: theme === 'light' ? '#fff' : '#000' },
              ]}
            >
              {item?.label}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    overflow: 'hidden',
    // Add shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
  lightBg: {
    backgroundColor: '#000',
  },
  darkBg: {
    backgroundColor: '#fff',
  },
});

export default React.memo(FabExtended);
