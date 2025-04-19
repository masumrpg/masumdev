import React from 'react';
import Animated from 'react-native-reanimated';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FabSingleProps } from '../types';

const FabSingle = ({
  component,
  onPress,
  style,
  theme = 'light',
}: FabSingleProps) => {
  const backgroundStyle = theme === 'light' ? styles.lightBg : styles.darkBg;

  return (
    <Animated.View style={[styles.container, backgroundStyle, style]}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        {component || (
          <Image
            source={require('../assets/PlusIcon.png')}
            style={[
              styles.icon,
              { tintColor: theme === 'light' ? '#fff' : '#000' },
            ]}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 50,
    width: 60,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchable: {
    width: '100%',
    height: '100%',
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

export default React.memo(FabSingle);
