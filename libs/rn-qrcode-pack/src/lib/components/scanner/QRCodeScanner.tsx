/**
 * A React Native component for scanning QR codes with advanced customization options.
 *
 * This component provides a highly customizable QR code scanner with features like:
 * - Camera preview with scanning frame
 * - Customizable UI elements (corners, overlay, controls)
 * - Haptic feedback
 * - Cooldown timer between scans
 * - Validation support
 * - Theme support (light/dark)
 * - Permission handling
 *
 * @module QRCodeScanner
 * @requires expo-camera
 * @requires expo-haptics
 * @requires expo-router
 * @requires react-native-svg
 *
 * @example
 * // Basic usage
 * <QRCodeScanner
 *   core={{
 *     onSuccessfulScan: (result) => {
 *       console.log('Scanned:', result.code);
 *     }
 *   }}
 * />
 *
 * @example
 * // Advanced usage with validation and custom styling
 * <QRCodeScanner
 *   core={{
 *     onSuccessfulScan: handleScan,
 *     validate: (code) => ({
 *       valid: code.startsWith('valid:'),
 *       message: 'Invalid QR code format'
 *     })
 *   }}
 *   appearance={{
 *     theme: 'dark',
 *     cornerStyle: {
 *       color: '#00FF00',
 *       width: 4,
 *       length: 30
 *     }
 *   }}
 *   haptics={{
 *     enableHapticFeedback: true
 *   }}
 * />
 *
 * @example
 * // Complete example with all features
 * <QRCodeScanner
 *   core={{
 *     onSuccessfulScan: (result) => {
 *       if (result.status === 'success') {
 *         console.log('Valid QR code:', result.code);
 *       } else {
 *         console.warn('Invalid scan:', result.message);
 *       }
 *     },
 *     validate: (code) => {
 *       // Custom validation logic
 *       const isValid = code.startsWith('https://');
 *       return {
 *         valid: isValid,
 *         message: isValid ? 'Valid URL' : 'Invalid URL format',
 *         code: isValid ? code : null
 *       };
 *     }
 *   }}
 *   scanning={{
 *     cooldownDuration: 3000,
 *     scanningArea: {
 *       targetX: 350,
 *       targetY: 150,
 *       tolerance: 40
 *     }
 *   }}
 *   uiControls={{
 *     showControls: true,
 *     showStatus: true,
 *     showTorchButton: true
 *   }}
 *   appearance={{
 *     theme: 'dark',
 *     overlayStyle: {
 *       backgroundColor: 'rgba(0,0,0,0.7)',
 *       opacity: 0.8
 *     },
 *     frameStyle: {
 *       width: 280,
 *       height: 280,
 *       borderRadius: 20
 *     },
 *     cornerStyle: {
 *       color: '#00FF00',
 *       width: 4,
 *       length: 40
 *     },
 *     controlButtonStyle: {
 *       backgroundColor: '#333333',
 *       borderRadius: 25,
 *       padding: 15,
 *       iconColor: '#FFFFFF',
 *       iconSize: 24
 *     },
 *     statusStyle: {
 *       backgroundColor: 'rgba(0,0,0,0.7)',
 *       textColor: '#FFFFFF',
 *       borderRadius: 10,
 *       padding: 10,
 *       fontWeight: '600'
 *     }
 *   }}
 *   callbacks={{
 *     onTorchChange: (isOn) => console.log('Torch:', isOn),
 *     onScanStart: () => console.log('Scanning started'),
 *     onScanEnd: () => console.log('Scanning ended'),
 *     onCooldownStart: (duration) => console.log('Cooldown started:', duration),
 *     onCooldownEnd: () => console.log('Cooldown ended')
 *   }}
 *   haptics={{
 *     enableHapticFeedback: true,
 *     customHapticFeedback: {
 *       success: 'success',
 *       error: 'error'
 *     }
 *   }}
 *   navigation={{
 *     showBackButton: true,
 *     backButtonIcon: 'arrow-back',
 *     onBackPress: () => navigation.goBack()
 *   }}
 *   customComponents={{
 *     renderCustomStatus: ({ isScanning, cooldownTimer }) => (
 *       <Text>Custom Status: {isScanning ? 'Scanning...' : `Cooldown: ${cooldownTimer}ms`}</Text>
 *     ),
 *     renderCustomControls: ({ isTorchOn, toggleTorch }) => (
 *       <TouchableOpacity onPress={toggleTorch}>
 *         <Text>{isTorchOn ? 'Turn Off Torch' : 'Turn On Torch'}</Text>
 *       </TouchableOpacity>
 *     )
 *   }}
 *   customStyles={{
 *     containerStyle: { flex: 1 },
 *     statusBoxStyle: { marginTop: 40 },
 *     statusTextStyle: { fontSize: 16 }
 *   }}
 * />
 */

import { Ionicons } from '@expo/vector-icons';
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Defs, Mask, Path, Rect } from 'react-native-svg';
import { CameraScreenPermission } from './CameraScreenPermission';
import { QRCodeScannerProps } from '../../types/scanner/qrCodeType';
import { getThemeColors } from '../../constants/scanner/qrCodeConstants';

// Modify the component to use the nested props structure
const QRCodeScanner = ({
  // Core functionality (required, not optional)
  core,

  // Optional props with defaults
  scanning = {},
  uiControls = {},
  appearance = {},
  callbacks = {},
  haptics = {},
  permissionScreen,
  navigation,
  customComponents = {},
  customStyles = {},
}: QRCodeScannerProps) => {
  // Extract values from nested objects with defaults
  // Core functionality
  const { onSuccessfulScan, validate } = core;

  // Scanning behavior
  const { cooldownDuration = 2000, scanningArea } = scanning;

  // UI Controls
  const {
    showControls = true,
    showStatus = true,
    showTorchButton = true,
  } = uiControls;

  // Appearance
  const {
    theme = 'light',
    overlayStyle,
    frameStyle,
    cornerStyle,
    controlButtonStyle,
    statusStyle,
  } = appearance;

  // Callbacks
  const {
    onTorchChange,
    onScanStart,
    onScanEnd,
    onCooldownStart,
    onCooldownEnd,
  } = callbacks;

  // Haptic feedback
  const { enableHapticFeedback = true, customHapticFeedback } = haptics;

  // Custom components
  const { renderCustomStatus, renderCustomControls } = customComponents;

  // Custom styles
  const { containerStyle, statusBoxStyle, statusTextStyle } = customStyles;

  // Rest of the component implementation remains the same
  const [permission, requestPermission] = useCameraPermissions();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isOuterTarget, setIsOuterTarget] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const { width, height } = useWindowDimensions();
  const scannedCodesRef = useRef(new Set<string>());
  const lastScanTimeRef = useRef<number>(0);
  const cooldownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hapticCooldownRef = useRef<{ [key: string]: number }>({});

  // Default theme values
  const themeColors = getThemeColors(theme);

  // Merge default settings with props
  const scanSettings = useMemo(() => {
    // Default frame size is a square that's 60% of the smaller dimension (width or height)
    const smallerDimension = Math.min(width, height);
    const defaultSize = Math.round(smallerDimension * 0.6);

    const squareSize = frameStyle?.width || defaultSize;
    const squareHeight = frameStyle?.height || squareSize;
    const borderRadius = frameStyle?.borderRadius || 12;
    const centerX = (width - squareSize) / 2;
    const centerY = (height - squareHeight) / 2;
    const cornerLength = cornerStyle?.length || 40;

    const semiBackgroundColor =
      overlayStyle?.backgroundColor || themeColors.overlayBgColor;
    const overlayOpacity =
      overlayStyle?.opacity !== undefined ? overlayStyle.opacity : 1;

    // Default target position is center of the frame
    const targetX = scanningArea?.targetX || 367.24;
    const targetY = scanningArea?.targetY || 144.38;
    const tolerance = scanningArea?.tolerance || 50;

    return {
      squareSize,
      squareHeight,
      borderRadius,
      centerX,
      centerY,
      cornerLength,
      semiBackgroundColor,
      overlayOpacity,
      targetX,
      targetY,
      tolerance,
      scanCooldown: cooldownDuration,
    };
  }, [
    width,
    height,
    cooldownDuration,
    frameStyle,
    cornerStyle,
    overlayStyle,
    scanningArea,
    themeColors,
  ]);

  // Handle cooldown timer
  useEffect(() => {
    if (cooldownTimer > 0) {
      if (onCooldownStart && cooldownTimer === scanSettings.scanCooldown) {
        onCooldownStart(cooldownTimer);
      }

      cooldownIntervalRef.current = setInterval(() => {
        setCooldownTimer((prev) => {
          if (prev <= 100) {
            clearInterval(cooldownIntervalRef.current as NodeJS.Timeout);
            if (onCooldownEnd) onCooldownEnd();
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    }

    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, [cooldownTimer, onCooldownStart, onCooldownEnd, scanSettings]);

  // Helper function to trigger haptic feedback with cooldown
  const triggerHaptic = useCallback(
    (type: Haptics.NotificationFeedbackType, key = 'default') => {
      if (!enableHapticFeedback) return;

      const now = Date.now();
      const lastHapticTime = hapticCooldownRef.current[key] || 0;

      if (now - lastHapticTime > cooldownDuration) {
        Haptics.notificationAsync(type);
        hapticCooldownRef.current[key] = now;
      }
    },
    [enableHapticFeedback, cooldownDuration]
  );

  // Handle torch toggle
  const toggleTorch = useCallback(() => {
    try {
      setIsTorchOn((prev) => {
        const newTorchState = !prev;
        // Call the callback prop with the new torch state
        if (onTorchChange) {
          onTorchChange(newTorchState);
        }
        return newTorchState;
      });
    } catch (e) {
      console.error(e);
      if (onTorchChange) {
        onTorchChange(isTorchOn);
      }
    }
  }, [isTorchOn, onTorchChange]);

  // Handle back navigation
  const handleBackPress = useCallback(() => {
    if (navigation?.onBackPress) {
      navigation.onBackPress();
    } else {
      router.back();
    }
  }, [navigation]);

  // Handle barcode scanning
  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (!isScanning) return;

      const currentTime = Date.now();
      const timeSinceLastScan = currentTime - lastScanTimeRef.current;

      if (timeSinceLastScan < scanSettings.scanCooldown) {
        const remainingCooldown = scanSettings.scanCooldown - timeSinceLastScan;
        setCooldownTimer(remainingCooldown);
        return;
      }

      const { bounds, raw } = result;

      if (!bounds || !raw) return;

      const isInTarget =
        bounds.origin.x >= scanSettings.targetX - scanSettings.tolerance &&
        bounds.origin.x <= scanSettings.targetX + scanSettings.tolerance &&
        bounds.origin.y >= scanSettings.targetY - scanSettings.tolerance &&
        bounds.origin.y <= scanSettings.targetY + scanSettings.tolerance;

      setIsOuterTarget(!isInTarget);

      if (!isInTarget) {
        return;
      }

      // Check if this code has already been scanned
      if (scannedCodesRef.current.has(raw)) {
        onSuccessfulScan({
          status: 'error',
          message: 'QR Code has already been scanned!',
          code: raw,
        });

        triggerHaptic(
          customHapticFeedback?.error || Haptics.NotificationFeedbackType.Error,
          'already-scanned-' + raw
        );

        // Set cooldown timer even for already scanned codes
        lastScanTimeRef.current = currentTime;
        setCooldownTimer(scanSettings.scanCooldown);
        return;
      }

      // If validate function is provided, use it
      if (validate) {
        const validationResult = validate(raw);
        if (!validationResult.valid) {
          onSuccessfulScan({
            status: 'error',
            message: validationResult.message || 'QR Code not valid!',
            code: null,
          });

          triggerHaptic(
            customHapticFeedback?.error ||
              Haptics.NotificationFeedbackType.Error
          );

          return;
        }

        // Use validation data if available, otherwise use raw data
        if (validationResult.code) {
          onSuccessfulScan({
            status: 'success',
            message: `Scan successful!`,
            code: validationResult.code,
          });
        } else {
          onSuccessfulScan({
            status: 'success',
            message: 'Scan successful!',
            code: raw,
          });
        }
      } else {
        // If no validate function, directly pass the raw data
        onSuccessfulScan({
          status: 'success',
          message: 'Scan successful!',
          code: raw,
        });
      }

      scannedCodesRef.current.add(raw);

      if (enableHapticFeedback) {
        triggerHaptic(
          customHapticFeedback?.success ||
            Haptics.NotificationFeedbackType.Success
        );
      }

      lastScanTimeRef.current = currentTime;
      setCooldownTimer(scanSettings.scanCooldown);

      if (onScanEnd) onScanEnd();

      setIsScanning(false);
      setTimeout(() => {
        setIsScanning(true);
        if (onScanStart) onScanStart();
      }, 1000);
    },
    [
      isScanning,
      scanSettings,
      validate,
      onSuccessfulScan,
      triggerHaptic,
      customHapticFeedback,
      enableHapticFeedback,
      onScanEnd,
      onScanStart,
    ]
  );

  // Handle permissions
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    const CustomPermissionScreen = permissionScreen?.component;
    if (CustomPermissionScreen) {
      return (
        <CustomPermissionScreen onPress={requestPermission} theme={theme} />
      );
    }

    return (
      <CameraScreenPermission
        onPress={requestPermission}
        theme={theme}
        {...permissionScreen?.props}
      />
    );
  }

  const cooldownSeconds = (cooldownTimer / 1000).toFixed(1);

  // Determine corner color based on props and state
  const activeCornerColor = isOuterTarget
    ? 'red'
    : cornerStyle?.color || themeColors.cornerColor;

  const cornerStrokeWidth = cornerStyle?.width || 3;

  // Custom control button styling
  const buttonStyles = {
    backgroundColor:
      controlButtonStyle?.backgroundColor || themeColors.controlBgColor,
    borderRadius: controlButtonStyle?.borderRadius || 9999,
    padding: controlButtonStyle?.padding || 12,
  };

  const iconColor = controlButtonStyle?.iconColor || themeColors.iconColor;
  const iconSize = controlButtonStyle?.iconSize || 20;

  // Custom status styling
  const statusBoxStyles: ViewStyle = {
    backgroundColor: statusStyle?.backgroundColor || themeColors.statusBgColor,
    borderRadius: statusStyle?.borderRadius || 16,
    paddingVertical: statusStyle?.padding || 8,
    paddingHorizontal: (statusStyle?.padding || 8) * 2,
    alignSelf: 'center' as const,
    marginTop: 80,
    maxWidth: '90%',
    ...statusBoxStyle,
  };

  const statusTextStyles = {
    color: statusStyle?.textColor || themeColors.statusTextColor,
    textAlign: 'center' as const,
    fontWeight: statusStyle?.fontWeight || 'bold',
    marginBottom: 4,
    ...statusTextStyle,
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={scanSettings.semiBackgroundColor}
        barStyle={theme === 'dark' ? 'light-content' : 'light-content'}
      />
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        autofocus="on"
        zoom={0.0}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        enableTorch={isTorchOn}
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
      >
        <Svg
          width={width + 1}
          height={height + 1}
          style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}
        >
          <Defs>
            <Mask id="holeMask" x="0" y="0" width={width} height={height}>
              <Rect width={width} height={height} fill="white" />
              <Rect
                x={scanSettings.centerX}
                y={scanSettings.centerY}
                width={scanSettings.squareSize}
                height={scanSettings.squareHeight}
                rx={scanSettings.borderRadius}
                ry={scanSettings.borderRadius}
                fill="black"
              />
            </Mask>
          </Defs>

          {/* Semi-transparent overlay with cutout */}
          <Rect
            width={width + 1}
            height={height}
            fill={scanSettings.semiBackgroundColor}
            fillOpacity={scanSettings.overlayOpacity}
            mask="url(#holeMask)"
          />

          {/* Top-left corner */}
          <Path
            d={`
              M ${scanSettings.centerX + scanSettings.cornerLength} ${
              scanSettings.centerY
            }
              L ${scanSettings.centerX + scanSettings.borderRadius} ${
              scanSettings.centerY
            }
              A ${scanSettings.borderRadius} ${
              scanSettings.borderRadius
            } 0 0 0 ${scanSettings.centerX} ${
              scanSettings.centerY + scanSettings.borderRadius
            }
              L ${scanSettings.centerX} ${
              scanSettings.centerY + scanSettings.cornerLength
            }
            `}
            stroke={activeCornerColor}
            strokeWidth={cornerStrokeWidth}
            fill="none"
          />

          {/* Top-right corner */}
          <Path
            d={`
              M ${
                scanSettings.centerX +
                scanSettings.squareSize -
                scanSettings.cornerLength
              } ${scanSettings.centerY}
              L ${
                scanSettings.centerX +
                scanSettings.squareSize -
                scanSettings.borderRadius
              } ${scanSettings.centerY}
              A ${scanSettings.borderRadius} ${
              scanSettings.borderRadius
            } 0 0 1 ${scanSettings.centerX + scanSettings.squareSize} ${
              scanSettings.centerY + scanSettings.borderRadius
            }
              L ${scanSettings.centerX + scanSettings.squareSize} ${
              scanSettings.centerY + scanSettings.cornerLength
            }
            `}
            stroke={activeCornerColor}
            strokeWidth={cornerStrokeWidth}
            fill="none"
          />

          {/* Bottom-left corner */}
          <Path
            d={`
              M ${scanSettings.centerX + scanSettings.cornerLength} ${
              scanSettings.centerY + scanSettings.squareHeight
            }
              L ${scanSettings.centerX + scanSettings.borderRadius} ${
              scanSettings.centerY + scanSettings.squareHeight
            }
              A ${scanSettings.borderRadius} ${
              scanSettings.borderRadius
            } 0 0 1 ${scanSettings.centerX} ${
              scanSettings.centerY +
              scanSettings.squareHeight -
              scanSettings.borderRadius
            }
              L ${scanSettings.centerX} ${
              scanSettings.centerY +
              scanSettings.squareHeight -
              scanSettings.cornerLength
            }
            `}
            stroke={activeCornerColor}
            strokeWidth={cornerStrokeWidth}
            fill="none"
          />

          {/* Bottom-right corner */}
          <Path
            d={`
              M ${
                scanSettings.centerX +
                scanSettings.squareSize -
                scanSettings.cornerLength
              } ${scanSettings.centerY + scanSettings.squareHeight}
              L ${
                scanSettings.centerX +
                scanSettings.squareSize -
                scanSettings.borderRadius
              } ${scanSettings.centerY + scanSettings.squareHeight}
              A ${scanSettings.borderRadius} ${
              scanSettings.borderRadius
            } 0 0 0 ${scanSettings.centerX + scanSettings.squareSize} ${
              scanSettings.centerY +
              scanSettings.squareHeight -
              scanSettings.borderRadius
            }
              L ${scanSettings.centerX + scanSettings.squareSize} ${
              scanSettings.centerY +
              scanSettings.squareHeight -
              scanSettings.cornerLength
            }
            `}
            stroke={activeCornerColor}
            strokeWidth={cornerStrokeWidth}
            fill="none"
          />
        </Svg>

        {/* Header controls */}
        {showControls && (
          <View style={[{ width }, styles.overlayContainer, containerStyle]}>
            {renderCustomControls ? (
              renderCustomControls({
                isTorchOn,
                toggleTorch,
                goBack: handleBackPress,
              })
            ) : (
              <View style={styles.topControls}>
                {navigation?.showBackButton !== false && (
                  <TouchableOpacity
                    onPress={handleBackPress}
                    style={[styles.iconButton, buttonStyles]}
                  >
                    <Ionicons
                      name={navigation?.backButtonIcon || 'close'}
                      size={iconSize}
                      color={iconColor}
                    />
                  </TouchableOpacity>
                )}
                {showTorchButton && (
                  <TouchableOpacity
                    onPress={toggleTorch}
                    style={[styles.iconButton, buttonStyles]}
                  >
                    <Ionicons
                      name={isTorchOn ? 'flash-off' : 'flash'}
                      size={iconSize}
                      color={iconColor}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {showStatus &&
              (renderCustomStatus ? (
                renderCustomStatus({
                  isScanning,
                  isOuterTarget,
                  cooldownTimer,
                  scannedCount: scannedCodesRef.current.size,
                })
              ) : (
                <View style={statusBoxStyles}>
                  <Text style={statusTextStyles}>
                    {cooldownTimer > 0
                      ? `${
                          scannedCodesRef.current.size > 0 ? 'Scanned' : ''
                        } (Cooldown: ${cooldownSeconds}s)`
                      : isScanning
                      ? isOuterTarget
                        ? 'Position the QR code inside the box'
                        : 'Scanning...'
                      : 'Success!'}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </CameraView>
    </>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  topControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 12,
  },
});

export {QRCodeScanner};