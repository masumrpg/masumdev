import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FabStackedProps } from '../types';

const FabStacked = ({
  items,
  style,
  containerStyle,
  theme = 'light',
  isOpen: setIsOpen,
  plusIcon,
}: FabStackedProps) => {
  // Consolidate initial values
  const [firstValue, secondValue, thirdValue, isOpen] = [
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(30),
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
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
      thirdValue.value = withDelay(100, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      thirdValue.value = withSpring(290);
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  // Consolidate animated styles
  const firstAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: firstValue.value, transform: [{ scale }] };
  });

  const secondAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      secondValue.value,
      [30, 210],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: secondValue.value, transform: [{ scale }] };
  });

  const thirdAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      thirdValue.value,
      [30, 290],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { bottom: thirdValue.value, transform: [{ scale }] };
  });

  const plusAnimatedStyle = useAnimatedStyle(() => {
    'worklet';
    return { transform: [{ rotate: `${progress.value * 45}deg` }] };
  });

  const animatedStyles = useMemo(
    () => ({
      first: firstAnimatedStyle,
      second: secondAnimatedStyle,
      third: thirdAnimatedStyle,
      plus: plusAnimatedStyle,
    }),
    [
      firstAnimatedStyle,
      secondAnimatedStyle,
      thirdAnimatedStyle,
      plusAnimatedStyle,
    ]
  );

  const sampleItems = useMemo(
    () => [
      { animate: animatedStyles.first },
      { animate: animatedStyles.second },
      { animate: animatedStyles.third },
    ],
    [animatedStyles]
  );

  const backgroundStyle = theme === 'light' ? styles.lightBg : styles.darkBg;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {items.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.contentContainer,
            sampleItems[index].animate,
            backgroundStyle,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              item?.onPress?.();
              handlePress();
            }}
            style={[styles.iconContainer, animatedStyles.plus, style]}
          >
            {item?.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Pressable
        style={[styles.contentContainer, backgroundStyle]}
        onPress={handlePress}
      >
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  lightBg: {
    backgroundColor: '#000',
  },
  darkBg: {
    backgroundColor: '#fff',
  },
});

export default React.memo(FabStacked);
