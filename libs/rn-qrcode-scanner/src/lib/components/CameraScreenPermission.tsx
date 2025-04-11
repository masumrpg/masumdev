import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { CameraScreenPermissionProps } from '../types';

/**
 * CameraScreenPermission is a component that displays a camera permission request screen
 * with customizable UI elements including theme support, custom text, and styling options.
 *
 * @component
 */
const CameraScreenPermission = ({
  onPress,
  theme = 'light',
  title = 'Allow Camera',
  subtitle = 'Please allow the app to access your camera if you want to proceed with scanning the ticket.',
  allowButtonText = 'ALLOW',
  declineButtonText = 'NOT NOW',
  backgroundColor = '#FFF',
  iconColor = '#000',
  dotColor1 = '#FB923C',
  dotColor2 = '#FDBA74',
  starColor1 = '#000',
  starColor2 = '#FF5722',
  buttonBackgroundColor = '#000',
  buttonTextColor = '#FFF',
  declineTextColor = '#000',
}: CameraScreenPermissionProps) => {
  const isDark = theme === 'dark';

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? '#000' : backgroundColor },
        ]}
      >
        {/* Decorative elements */}
        <View style={styles.starTopLeft}>
          <Ionicons
            name="star"
            size={16}
            color={isDark ? '#FFF' : starColor1}
          />
        </View>
        <View style={styles.dotTopRight}>
          <View
            style={[
              styles.orangeDotSmall,
              { borderColor: isDark ? '#FFF' : dotColor1 },
            ]}
          />
        </View>
        <View style={styles.starBottomRight}>
          <Ionicons
            name="star-outline"
            size={18}
            color={isDark ? '#FFF' : starColor1}
          />
        </View>
        <View style={styles.starTopLeftAlt}>
          <Ionicons
            name="star-outline"
            size={20}
            color={isDark ? '#FFF' : starColor2}
          />
        </View>
        <View style={styles.dotBottomLeft}>
          <View
            style={[
              styles.purpleDot,
              { borderColor: isDark ? '#FFF' : starColor1 },
            ]}
          />
        </View>
        <View style={styles.dotTopRightAlt}>
          <View
            style={[
              styles.orangeDotTiny,
              { borderColor: isDark ? '#FFF' : dotColor2 },
            ]}
          />
        </View>

        <View style={styles.centerContent}>
          {/* Camera Icon */}
          <View style={styles.cameraWrapper}>
            <View style={styles.cameraBox}>
              <Ionicons
                name="camera-outline"
                size={64}
                color={isDark ? '#FFF' : iconColor}
              />
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text
              style={[styles.title, { color: isDark ? '#FFF' : '#1F2937' }]}
            >
              {title}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? '#D1D5DB' : '#6B7280' },
              ]}
            >
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Allow Button */}
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.allowButton,
            { backgroundColor: isDark ? '#FFF' : buttonBackgroundColor },
          ]}
        >
          <Text
            style={[
              styles.allowButtonText,
              { color: isDark ? '#000' : buttonTextColor },
            ]}
          >
            {allowButtonText}
          </Text>
        </TouchableOpacity>

        {/* Decline Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.declineButton}
        >
          <Text
            style={[
              styles.declineButtonText,
              { color: isDark ? '#FFF' : declineTextColor },
            ]}
          >
            {declineButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    position: 'relative',
  },
  starTopLeft: {
    position: 'absolute',
    top: 96,
    left: 96,
  },
  dotTopRight: {
    position: 'absolute',
    top: 160,
    right: 96,
  },
  orangeDotSmall: {
    height: 12,
    width: 12,
    borderRadius: 9999,
    borderWidth: 1,
  },
  starBottomRight: {
    position: 'absolute',
    bottom: 192,
    right: 64,
  },
  starTopLeftAlt: {
    position: 'absolute',
    top: 128,
    left: 64,
  },
  dotBottomLeft: {
    position: 'absolute',
    bottom: 160,
    left: 80,
  },
  purpleDot: {
    height: 16,
    width: 16,
    borderRadius: 9999,
    borderWidth: 1,
  },
  dotTopRightAlt: {
    position: 'absolute',
    top: 192,
    right: 48,
  },
  orangeDotTiny: {
    height: 8,
    width: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  cameraWrapper: {
    marginBottom: 24,
    position: 'relative',
  },
  cameraBox: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 28,
  },
  allowButton: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: 256,
    marginTop: 80,
  },
  allowButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  declineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: 256,
    marginTop: 20,
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export { CameraScreenPermission };