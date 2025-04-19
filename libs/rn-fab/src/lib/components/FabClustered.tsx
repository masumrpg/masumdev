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
import { FabClusteredProps } from '../types';

const FabClustered = ({
  items,
  style,
  containerStyle,
  theme = 'light',
  isOpen: setIsOpen,
  plusIcon,
}: FabClusteredProps) => {
  const [firstValue, secondValue, thirdValue] = [
    useSharedValue(30),
    useSharedValue(30),
    useSharedValue(30),
  ];

  const [firstWidth, secondWidth, thirdWidth] = [
    useSharedValue(60),
    useSharedValue(60),
    useSharedValue(60),
  ];

  const [isOpen, opacity] = [useSharedValue(false), useSharedValue(0)];

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
      firstWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        'worklet';
        if (finish) {
          firstValue.value = withTiming(30, config);
        }
      });

      secondWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        'worklet';
        if (finish) {
          secondValue.value = withDelay(50, withTiming(30, config));
        }
      });

      thirdWidth.value = withTiming(60, { duration: 100 }, (finish) => {
        'worklet';
        if (finish) {
          thirdValue.value = withDelay(100, withTiming(30, config));
        }
      });

      opacity.value = withTiming(0, { duration: 100 });
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      thirdValue.value = withSpring(290);

      firstWidth.value = withDelay(1200, withSpring(200));
      secondWidth.value = withDelay(1100, withSpring(200));
      thirdWidth.value = withDelay(1000, withSpring(200));

      opacity.value = withDelay(1200, withSpring(1));
    }

    isOpen.value = !isOpen.value;
    setIsOpen?.(!isOpen.value);
  };

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const firstWidthStyle = useAnimatedStyle(() => ({
    width: firstWidth.value,
  }));

  const secondWidthStyle = useAnimatedStyle(() => ({
    width: secondWidth.value,
  }));

  const thirdWidthStyle = useAnimatedStyle(() => ({
    width: thirdWidth.value,
  }));

  const firstIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: firstValue.value,
      transform: [{ scale }],
    };
  });

  const secondIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [30, 210],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: secondValue.value,
      transform: [{ scale }],
    };
  });

  const thirdIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      thirdValue.value,
      [30, 290],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      bottom: thirdValue.value,
      transform: [{ scale }],
    };
  });

  const plusIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 45}deg` }],
  }));

  const sampleItems = useMemo(
    () => [
      {
        animate: firstIconStyle,
        width: firstWidthStyle,
      },
      {
        animate: secondIconStyle,
        width: secondWidthStyle,
      },
      {
        animate: thirdIconStyle,
        width: thirdWidthStyle,
      },
    ],
    [
      firstIconStyle,
      secondIconStyle,
      thirdIconStyle,
      firstWidthStyle,
      secondWidthStyle,
      thirdWidthStyle,
    ]
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
            sampleItems[index].width,
            backgroundStyle,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              item?.onPress?.();
              handlePress();
            }}
            style={[styles.iconContainer, style]}
          >
            {item?.icon}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              item?.onPress?.();
              handlePress();
            }}
          >
            <Animated.Text style={[styles.text, opacityStyle]}>
              {item?.label}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Pressable
        style={[styles.contentContainer, backgroundStyle]}
        onPress={handlePress}
      >
        <Animated.View style={[styles.iconContainer, plusIconStyle, style]}>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  text: {
    color: 'white',
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

export default React.memo(FabClustered);
