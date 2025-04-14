# @masumdev/rn-qrcode-scanner

A powerful and easy-to-use QR code scanning and generation library for React Native applications.

> **Note:** Currently, this library only supports Android platform. iOS support is under development and will be available in future releases.

[![Sponsor](https://img.shields.io/badge/sponsor-%E2%9D%A4-lightgrey?logo=github)](https://github.com/sponsors/masumrpg)

<div style="display: flex; gap: 8px;">
  <img src="https://img.shields.io/npm/v/@masumdev%2Frn-qrcode-scanner" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/@masumdev%2Frn-qrcode-scanner" alt="npm downloads" />
  <img src="https://img.shields.io/badge/platform-android-lightgrey.svg" alt="platform" />
  <img src="https://img.shields.io/badge/Expo-compatible-9cf.svg" alt="expo compatible" />
</div>


## Demo

<p align="center">
  <img src="./android.gif" alt="QR Scanner Android" width="45%" height="auto" style="vertical-align: top;" />
</p>

## Youtube Tutorial
Soon
<!-- <p align="center">
  <a href="https://www.youtube.com/watch?v=oBM0lh7tcyY" target="_blank">
    <img src="https://img.youtube.com/vi/oBM0lh7tcyY/maxresdefault.jpg"
      alt="React Native Toast Demo"
      width="600"
      style="border-radius: 10px"
    />
  </a>
</p> -->

## Features

- 📱 Advanced QR Code scanning with camera support
- 🔍 Multiple format support (URL, text, contact info, etc.)
- 💫 Real-time scanning with high performance
- 🎯 Customizable scanning area and frame
- 🛡️ Built-in camera permission handling
- 📳 Haptic feedback on successful scans
- 🎨 Customizable UI elements (corners, overlay, controls)
- 🔦 Torch/flashlight control support
- ⏱️ Cooldown timer between scans
- ✅ Custom validation support
- 🌓 Theme support (light/dark mode)
- ⚡ Optimized for Android platform

## Installation

### Prerequisites

Make sure you have these peer dependencies installed in your React Native project:

```json
{
  "react": ">=18.3.1",
  "react-native": ">=0.76.9",
  "react-native-svg": ">=15.8.0",
  "expo": ">=50.0.0",
  "expo-camera": ">=14.0.0",
  "expo-haptics": ">=12.8.0",
  "expo-router": ">=3.4.0",
  "@expo/vector-icons": ">=14.0.0"
}
```

Add in `app.json`
```json
{
  // existing confoguration
  {
  "plugins": [
    "expo-router",
    [
      "expo-camera",
      {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
        "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
        "recordAudioAndroid": true
      }
    ]
  ]
}

}
```

### Installing peer dependencies
```bash
npm install expo-camera expo-haptics expo-router @expo/vector-icons
```
or
```bash
yarn add expo-camera expo-haptics expo-router @expo/vector-icons
```
or
```bash
bun add expo-camera expo-haptics expo-router @expo/vector-icons
```
or
```bash
pnpm add expo-camera expo-haptics expo-router @expo/vector-icons
```

### Installing @masumdev/rn-qrcode-scanner

```bash
npm install @masumdev/rn-qrcode-scanner
```
or
```bash
yarn add @masumdev/rn-qrcode-scanner
```
or
```bash
bun add @masumdev/rn-qrcode-scanner
```
or
```bash
pnpm add @masumdev/rn-qrcode-scanner
```

## Usage

### Basic Usage

```tsx
import { QRCodeScanner } from '@masumdev/rn-qrcode-scanner';

const ScannerComponent = () => {
  const handleScan = (data: string) => {
    console.log('Scanned QR Code:', data);
  };

  return (
    <QRCodeScanner
        core={{
          onSuccessfulScan: handleSuccessfulScan,
        }}
    />
  );
};

export default ScannerComponent;
```

### Advanced Usage

```tsx
import {
  OnSuccessfulScanProps,
  QRCodeScanner,
  QRCodeValidator,
} from '@masumdev/rn-qrcode-scanner';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const QRCodeScannerScreen = () => {
  const [scannedMember, setScannedMember] = useState<string | null>(null);

  const handleSuccessfulScan = (data: OnSuccessfulScanProps) => {
    if (data.code) {
      setScannedMember(data.code);
    }
    console.log(data);
  };

  const validateQRCode: QRCodeValidator = (code: string) => {
    // Example: Only accept URLs starting with https://
    // if (code.startsWith('https://')) {
    //   return { valid: true, code };
    // }

    // // Example: Accept product codes with specific format
    // if (/^PROD-\d{6}$/.test(code)) {
    //   return { valid: true, code };
    // }

    if (code) {
      return { valid: true, code, message: 'Success' };
    }

    return {
      valid: false,
      message:
        'Invalid QR code format. Expected HTTPS URL or product code (PROD-XXXXXX).',
    };
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <QRCodeScanner
        // Core functionality
        core={{
          onSuccessfulScan: handleSuccessfulScan,
          validate: validateQRCode,
        }}
        // Scanning behavior
        scanning={{
          cooldownDuration: 3000,
          scanningArea: {
            // tolerance: 80,∂
          },
        }}
        // UI Controls
        uiControls={{
          showControls: true,
          showStatus: true,
          showTorchButton: false, // We're using custom controls
        }}
        // Appearance
        appearance={{
          theme: 'light',
          overlayStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            opacity: 0.9,
          },
          frameStyle: {
            width: 280,
            height: 280,
            borderRadius: 20,
          },
          cornerStyle: {
            color: '#00AAFF',
            width: 4,
            length: 30,
          },
          statusStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            textColor: '#FFFFFF',
            borderRadius: 12,
            padding: 10,
            fontWeight: '600',
          },
        }}
      />

      {scannedMember && (
        <View style={styles.bottomContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.memberText}>{scannedMember}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  memberText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default QRCodeScannerScreen;
```

## API Reference

### QRCodeScanner Props

QRCodeScanner component accepts several prop groups that control different aspects of its functionality:

#### Core Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onSuccessfulScan | (state: OnSuccessfulScanProps) => void | Yes | Callback function called when QR code is successfully scanned |
| validate | QRCodeValidator | No | Custom validation function for scanned QR codes |

#### Scanning Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cooldownDuration | number | 2000 | Time in milliseconds between scans |
| scanningArea | ScanningAreaProps | - | Configure the scanning target area |

##### ScanningAreaProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| targetX | number | - | X coordinate of scanning target |
| targetY | number | - | Y coordinate of scanning target |
| tolerance | number | - | Tolerance area around target coordinates |

#### UI Controls Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showControls | boolean | true | Show/hide control buttons |
| showStatus | boolean | true | Show/hide status information |
| showTorchButton | boolean | true | Show/hide torch control button |

#### Appearance Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| theme | 'light' \| 'dark' | 'light' | UI theme selection |
| overlayStyle | OverlayStyle | - | Customize scanner overlay |
| frameStyle | FrameStyle | - | Customize scanner frame |
| cornerStyle | CornerStyle | - | Customize corner markers |
| controlButtonStyle | ControlButtonStyle | - | Customize control buttons |
| statusStyle | StatusStyle | - | Customize status display |

##### OverlayStyle

| Prop | Type | Description |
|------|------|-------------|
| backgroundColor | string | Background color of overlay |
| opacity | number | Opacity level of overlay |

##### FrameStyle

| Prop | Type | Description |
|------|------|-------------|
| width | number | Width of scanning frame |
| height | number | Height of scanning frame |
| borderRadius | number | Border radius of frame corners |

##### CornerStyle

| Prop | Type | Description |
|------|------|-------------|
| color | string | Color of corner markers |
| width | number | Width of corner lines |
| length | number | Length of corner lines |

##### StatusStyle

| Prop | Type | Description |
|------|------|-------------|
| backgroundColor | string | Background color of status box |
| textColor | string | Color of status text |
| borderRadius | number | Border radius of status box |
| padding | number | Padding inside status box |
| fontWeight | string | Font weight of status text |

#### Callbacks Props

| Prop | Type | Description |
|------|------|-------------|
| onTorchChange | (isOn: boolean) => void | Called when torch state changes |
| onScanStart | () => void | Called when scanning starts |
| onScanEnd | () => void | Called when scanning ends |
| onCooldownStart | (duration: number) => void | Called when cooldown period starts |
| onCooldownEnd | () => void | Called when cooldown period ends |

#### Haptics Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| enableHapticFeedback | boolean | true | Enable/disable haptic feedback |
| customHapticFeedback | { success?: NotificationFeedbackType; error?: NotificationFeedbackType } | - | Custom haptic feedback settings |

#### Navigation Props

| Prop | Type | Description |
|------|------|-------------|
| onBackPress | () => void | Custom back button handler |
| showBackButton | boolean | Show/hide back button |
| backButtonIcon | string | Icon name for back button |

#### Custom Components Props

| Prop | Type | Description |
|------|------|-------------|
| renderCustomStatus | (statusInfo: StatusInfo) => React.ReactNode | Custom status component renderer |
| renderCustomControls | (controls: ControlsInfo) => React.ReactNode | Custom controls component renderer |

#### Custom Styles Props

| Prop | Type | Description |
|------|------|-------------|
| containerStyle | ViewStyle | Custom styles for container |
| statusBoxStyle | ViewStyle | Custom styles for status box |
| statusTextStyle | TextStyle | Custom styles for status text |


## License

MIT