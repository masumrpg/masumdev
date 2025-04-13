# @masumdev/rn-qrcode

A powerful and easy-to-use QR code scanning and generation library for React Native applications.

[![Sponsor](https://img.shields.io/badge/sponsor-%E2%9D%A4-lightgrey?logo=github)](https://github.com/sponsors/masumrpg)

<div style="display: flex; gap: 8px;">
  <img src="https://img.shields.io/npm/v/@masumdev%2Frn-qrcode" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/@masumdev%2Frn-qrcode" alt="npm downloads" />
  <img src="https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg" alt="platforms" />
  <img src="https://img.shields.io/badge/Expo-compatible-9cf.svg" alt="expo compatible" />
</div>

## Demo

<p align="center">
  <img src="./android.gif" alt="Toast Demo Iphone" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./ios.gif" alt="Toast Demo" width="45%" height="auto" style="vertical-align: top;" />
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

- 🎨 Rich QR Code styling with fully customizable:
  - Colors and gradients
  - Patterns and shapes
  - Corner styles and dot designs
  - Background effects
- 🖼️ Custom logo placement with adjustable size and position
- 🌈 Beautiful preset templates and themes
- 🔍 Comprehensive format support for:
  - URLs and deep links
  - Contact information (vCard, meCard)
  - Calendar events
  - Wi-Fi configurations
  - And more!
- 🎯 Adjustable error correction levels (L, M, Q, H)
- 📦 Seamless integration with React Native projects
- 💫 Cross-platform compatibility (iOS & Android)
- ⚡ High-performance QR code generation
- 🎭 Multiple design variants and styles

## Installation

### Prerequisites

Make sure you have these peer dependencies installed in your React Native project:

```json
{
  "react": ">=18.3.1",
  "react-native": ">=0.76.9",
  "react-native-svg": ">=15.8.0"
}
```

### Installing peer dependencies

```bash
npm install react react-native react-native-svg
```

or

```bash
yarn add react react-native react-native-svg
```

or

```bash
bun add react react-native react-native-svg
```

or

```bash
pnpm add react react-native react-native-svg
```

### Installing @masumdev/rn-qrcode

```bash
npm install @masumdev/rn-qrcode
```

or

```bash
yarn add @masumdev/rn-qrcode
```

or

```bash
bun add @masumdev/rn-qrcode
```

or

```bash
pnpm add @masumdev/rn-qrcode
```

## Usage

### Basic Usage

```tsx
import { QRCode } from '@masumdev/rn-qrcode';

const GeneratorComponent = () => {
  return <QRCode variant="BASIC" value="https://github.com/masumrpg" size={300} backgroundColor="white" errorCorrectionLevel="H" includeBackground />;
};
```

### Advanced Usage

```tsx
import { QRCode } from '@masumdev/rn-qrcode';
import { View } from 'react-native';

export default function App() {
  // Rain Effect
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <QRCode
        value="Rain Qr Code"
        size={qrSize}
        color="#2074a7"
        version={2}
        eye={{
          topLeft: {
            shape: 'square',
            size: {
              center: 1.2,
              inner: 1.3,
            },
            radius: {
              radiusOuter: 20,
              radiusInner: 13,
              radiusCenter: 10,
            },
          },
          topRight: {
            shape: 'square',
            size: {
              center: 1.2,
              inner: 1.3,
            },
            radius: {
              radiusOuter: 20,
              radiusInner: 13,
              radiusCenter: 10,
            },
          },
          bottomLeft: {
            shape: 'square',
            size: {
              center: 1.2,
              inner: 1.3,
            },
            radius: {
              radiusOuter: 20,
              radiusInner: 13,
              radiusCenter: 10,
            },
          },
        }}
        piece={{
          shape: 'rain',
          size: 1,
        }}
        includeBackground
      />
    </View>
  );
}
```

## API Reference

### QRCodeProps

Core properties for customizing the QR code appearance and behavior.

| Prop                 | Type                     | Default | Description                  |
| -------------------- | ------------------------ | ------- | ---------------------------- |
| value                | string                                 | -       | The content to be encoded in the QR code. Can be any text, URL, or data string. |
| variant              | QRCodeVariant              | 'BASIC' | The design variant of the QR code. Choose from predefined templates. |
| size                 | number                                 | 256     | The size of the QR code in pixels. Determines both width and height. |
| color                | string                                 | '#000'  | The main color of the QR code elements. Accepts any valid CSS color value. |
| backgroundColor      | string                                 | 'transparent' | The background color behind the QR code. Set to 'transparent' for no background. |
| gradient             | QRCodeGradientConfig                  | -       | Advanced gradient configuration for creating beautiful color transitions. |
| logo                 | LogoOptions                            | -       | Options for adding a centered logo image with customizable size and styling. |
| piece                | PieceOptions                           | -       | Customize the shape and style of individual QR code elements. |
| eye                  | EyeOptions                              | -       | Style the three corner finder patterns (eyes) of the QR code. |
| includeBackground    | boolean                                | false   | When true, adds a wrapper background element behind the QR code. |
| version              | QRCodeVersion                         | -       | Set a specific QR code version (1-40). Higher versions can store more data. |
| maxVersion           | QRCodeVersion                         | -       | The maximum allowed QR code version. Useful for limiting complexity. |
| errorCorrectionLevel | QRCodeErrorCorrectionLevel            | 'M'     | Error correction capability: L (7%), M (15%), Q (25%), or H (30%). |

#### QRCodeVariant
Choose from a range of predefined templates to quickly style your QR code.
| Value | Description | Visual Effect |
|-------|-------------|---------------|
| 'BASIC' | Simple, basic QR code | Minimalistic, clean |
| 'TRIANGLE' | Triangle-shaped QR code | Triangular, elegant |
| 'HEART' | Heart-shaped QR code | Hearty, romantic |
| 'DOT' | Dotted QR code pattern | Modern, minimalist |
| 'WITH_LOGO' | QR code with centered logo | Professional, branded |
| 'RAIN' | Rainy QR code with falling pieces | Rainy, atmospheric |
| 'LINEAR_GRADIENT' | Linear gradient colored QR code | Smooth, colorful |
| 'RADIAL_GRADIENT' | Radial gradient colored QR code | Dynamic, radiant |
| 'IMAGE_BACKGROUND' | QR code with image background | Creative, unique |

#### QRCodeGradientConfig
Create beautiful gradient effects for your QR code with these advanced configuration options.

| Prop                 | Type                                     | Default    | Description                                                                 |
| -------------------- | ---------------------------------------- | ---------- | --------------------------------------------------------------------------- |
| type                 | 'linear' \| 'radial'                    | 'linear'   | Choose between linear (straight line) or radial (circular) gradient patterns |
| maskLogo             | boolean                                  | false      | When true, prevents the gradient from overlaying the logo area              |
| direction            | GradientDirection                        | 'to-right' | Sets the flow direction for linear gradients (see GradientDirection below)   |
| colors               | GradientColor[]                          | -          | Define multiple color stops with position and opacity for smooth transitions |
| cx                   | string                                   | '50%'      | Center X position of radial gradient (e.g. '50%' for middle)               |
| cy                   | string                                   | '50%'      | Center Y position of radial gradient (e.g. '50%' for middle)               |
| r                    | string                                   | '50%'      | Radius of the radial gradient (e.g. '50%' for half of QR code size)        |
| fx                   | string                                   | -          | Focal point X position for radial gradient (creates elliptical effects)    |
| fy                   | string                                   | -          | Focal point Y position for radial gradient (creates elliptical effects)    |
| x1                   | string                                   | '0%'       | Starting X position for linear gradient (e.g. '0%' for left edge)          |
| y1                   | string                                   | '0%'       | Starting Y position for linear gradient (e.g. '0%' for top edge)           |
| x2                   | string                                   | '100%'     | Ending X position for linear gradient (e.g. '100%' for right edge)         |
| y2                   | string                                   | '0%'       | Ending Y position for linear gradient (e.g. '0%' for top edge)             |

#### GradientDirection
Specify the flow direction of linear gradients. This setting creates dynamic and visually appealing QR codes.

| Value | Description | Visual Effect |
|-------|-------------|---------------|
| 'to-right' | Gradient flows from left to right | Horizontal transition →|
| 'to-left' | Gradient flows from right to left | Horizontal transition ←|
| 'to-bottom' | Gradient flows from top to bottom | Vertical transition ↓|
| 'to-top' | Gradient flows from bottom to top | Vertical transition ↑|
| 'to-bottom-right' | Gradient flows diagonally from top-left to bottom-right | Diagonal transition ↘|
| 'to-bottom-left' | Gradient flows diagonally from top-right to bottom-left | Diagonal transition ↙|
| 'to-top-right' | Gradient flows diagonally from bottom-left to top-right | Diagonal transition ↗|
| 'to-top-left' | Gradient flows diagonally from bottom-right to top-left | Diagonal transition ↖|

#### GradientColor
Define smooth color transitions by specifying multiple color stops in your gradient. Each stop controls position, color, and transparency.

| Prop | Type | Description | Example |
|------|------|-------------|----------|
| offset | string | Position of the color stop along the gradient (0-100%) | '0%' for start, '50%' for middle, '100%' for end |
| color | string | Any valid color value (hex, rgb, named colors) | '#FF5733', 'rgb(255,87,51)', 'coral' |
| opacity | number | Transparency level between 0 (invisible) and 1 (solid) | 0.8 for 80% opacity |

#### LogoOptions
Customize the appearance of a centered logo within your QR code. The logo can be an image from your local assets or a remote URL.

| Prop              | Type      | Default | Description                                      | Notes |
|--------------------|-----------|---------|--------------------------------------------------|--------|
| source            | ImageSource | -       | Logo image source (local asset/URL)             | See ImageSource below for format details |
| size              | number    | 20%     | Logo size as percentage of QR code width        | Keep between 10-30% for best scanning |
| backgroundColor   | string    | 'white' | Background color behind the logo               | Use light colors for better contrast |
| padding           | number    | 2       | Space around logo in pixels                    | Helps logo stand out from QR pattern |
| borderRadius      | number    | 0       | Rounded corners for logo background            | Higher values create circular shapes |

#### ImageSource
Specify the source of your logo image. The component supports both local project assets and remote image URLs.

| Type | Description | Example | Best Practices |
|------|-------------|----------|----------------|
| number | Local image from project assets | require('./assets/logo.png') | Use for bundled images |
| string | Remote image from URL | 'https://example.com/logo.png' | Ensure reliable hosting |

Important Guidelines:
- Local assets: Use require() for images in your project directory
- Remote URLs: Provide complete HTTPS URLs for security
- Supported formats: PNG (recommended), JPG, JPEG
- Optimal size: 50-100 pixels for best balance of clarity and scanning
- File size: Keep under 50KB to maintain performance

#### PieceOptions
Customize the appearance of individual QR code elements (the small squares that make up the pattern).

| Prop    | Type               | Default | Description                                      | Visual Impact |
|---------|--------------------|---------|--------------------------------------------------|---------------|
| shape   | 'square'\|'dot'\|'triangle'\|'heart'\|'rain' | 'square' | Shape of each QR code element | Changes overall pattern style |
| size    | number             | 1       | Scale factor for element size (0.5-2.0)         | Affects density and readability |
| spacing | number             | 0       | Gap between elements in pixels                   | Creates breathing room in pattern |

#### EyeOptions
Style the three finder patterns (eyes) in the corners of the QR code. These are crucial for scanner orientation.

| Prop        | Type                              | Default | Description                                      | Impact |
|-------------|-----------------------------------|---------|--------------------------------------------------|--------|
| topLeft    | EyeShapeConfig                    | {}      | Style for top-left corner pattern                | Affects scanning reliability |
| topRight   | EyeShapeConfig                    | {}      | Style for top-right corner pattern               | Must remain distinct |
| bottomLeft | EyeShapeConfig                    | {}      | Style for bottom-left corner pattern             | Helps orientation |

##### EyeShapeConfig
Detailed configuration for each QR code eye (finder pattern).

| Prop      | Type                             | Default | Description                                      | Best Practice |
|-----------|----------------------------------|---------|--------------------------------------------------|---------------|
| shape     | 'square'\|'circle'\|'rounded'    | 'square' | Overall shape of the eye pattern                | Keep distinctive |
| size      | { center: number, inner: number }| -       | Size multiplier for center and inner components  | Maintain proportions |
| radius    | { radiusOuter: number, radiusInner: number, radiusCenter: number } | - | Corner rounding for each part | Balance style with function |
| color     | string                           | -       | Main color of the eye pattern                    | Use high contrast |
| innerColor| string                           | -       | Color of the inner eye component                 | Complement main color |

#### QRCodeVersion
Control the size and data capacity of your QR code.

| Type       | Description                              | Use Case |
|------------|------------------------------------------|----------|
| number (1-40) | QR code version number                    | Higher versions = more data, larger size |

Version Guide:
- 1-10: Best for short URLs and text (up to 174 characters)
- 11-20: Medium content (up to 1,663 characters)
- 21-40: Large content like vCards or detailed data

#### QRCodeErrorCorrectionLevel
Balance between data redundancy and error correction capability.

| Level | Error Correction Capacity | Best Used For |
|-------|----------------------------|---------------|
| L     | ~7% damage recovery        | Clean environments, maximum data capacity |
| M     | ~15% damage recovery       | Standard use, good balance |
| Q     | ~25% damage recovery       | Public display, some wear expected |
| H     | ~30% damage recovery       | Outdoor use, high reliability needed |

## License

MIT
