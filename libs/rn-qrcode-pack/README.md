# @masumdev/rn-qrcode-pack

A powerful and easy-to-use QR code scanning and generation library for React Native applications.

[![Sponsor](https://img.shields.io/badge/sponsor-%E2%9D%A4-lightgrey?logo=github)](https://github.com/sponsors/masumrpg)

<div style="display: flex; gap: 8px;">
  <img src="https://img.shields.io/npm/v/@masumdev%2Frn-qrcode-pack" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/@masumdev%2Frn-qrcode-pack" alt="npm downloads" />
  <img src="https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg" alt="platforms" />
  <img src="https://img.shields.io/badge/Expo-compatible-9cf.svg" alt="expo compatible" />
</div>

## Features

- 📱 QR Code scanning with camera support
- 🎨 QR Code generation with customizable styles
- 🔍 Multiple format support (URL, text, contact info, etc.)
- 💫 Real-time scanning with high performance
- 🎯 Error correction level customization
- 🛡️ Permission handling for camera access
- 📦 Easy integration with React Native projects
- ⚡ Optimized for both iOS and Android

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

### Installing peer dependencies
```bash
npm install react react-native expo expo-camera expo-haptics expo-router @expo/vector-icons
```
or
```bash
yarn add react react-native expo expo-camera expo-haptics expo-router @expo/vector-icons
```
or
```bash
bun add react react-native expo expo-camera expo-haptics expo-router @expo/vector-icons
```
or
```bash
pnpm add react react-native expo expo-camera expo-haptics expo-router @expo/vector-icons
```

### Installing @masumdev/rn-qrcode-pack

```bash
npm install @masumdev/rn-qrcode-pack
```
or
```bash
yarn add @masumdev/rn-qrcode-pack
```
or
```bash
bun add @masumdev/rn-qrcode-pack
```
or
```bash
pnpm add @masumdev/rn-qrcode-pack
```

## Basic Usage

### QR Code Scanner

```tsx
import { QRCodeScanner } from '@masumdev/rn-qrcode-pack';

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

### QR Code Generator

```tsx
import { QRCode } from '@masumdev/rn-qrcode-pack';

const GeneratorComponent = () => {
  return (
    <QRCode
      variant="BASIC"
      value="https://github.com/masumrpg"
      size={300}
      backgroundColor="white"
      errorCorrectionLevel="H"
    />
  );
};
```

## API Reference

### QRCodeScanner Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onScan | function | - | Callback when QR code is scanned |
| style | ViewStyle | - | Container style for scanner |
| vibrate | boolean | true | Vibrate on successful scan |
| flashMode | 'on' \| 'off' \| 'auto' | 'auto' | Camera flash mode |
| zoom | number | 0 | Camera zoom level (0-1) |

### QRCodeGenerator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | - | Content to encode in QR code |
| size | number | 200 | Size of QR code |
| backgroundColor | string | 'white' | Background color |
| foregroundColor | string | 'black' | QR code color |
| errorCorrectionLevel | 'L' \| 'M' \| 'Q' \| 'H' | 'M' | Error correction level |
| logo | ImageSourcePropType | - | Optional logo in center |

## License

MIT