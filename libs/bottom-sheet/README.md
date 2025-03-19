# @masumdev/bottom-sheet

A highly customizable and gesture-responsive bottom sheet component for React Native applications.

## Demo

<p align="center">
  <img src="./iphone.gif" alt="Toast Demo Iphone" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./android.gif" alt="Toast Demo" width="45%" height="auto" style="vertical-align: top;" />
</p>

## Youtube Tutorial
<p align="center">
  <a href="https://www.youtube.com/watch?v=oBM0lh7tcyY" target="_blank">
    <img src="https://img.youtube.com/vi/oBM0lh7tcyY/maxresdefault.jpg"
      alt="React Native Toast Demo"
      width="600"
      style="border-radius: 10px"
    />
  </a>
</p>

## Features

- 🎯 Customizable snap points (10% to 90% of screen height)
- 🎨 Customizable background and backdrop colors
- 📱 iOS and Android back gesture/button handling
- 💫 Smooth animations and gestures using react-native-reanimated
- 🔄 Context-based state management
- 📜 Scrollable content support
- 🔝 Dynamic height adjustment
- 🎯 Title and content management through hooks
- 🛡️ Safe area support

## Installation

### Prerequisites

Make sure you have these peer dependencies installed in your React Native project:

```json
{
  "react": "^18.3.1",
  "react-native": "^0.76.7",
  "react-native-reanimated": "^3.16.7",
  "react-native-gesture-handler": "^2.20.2",
  "react-native-safe-area-context": "^4.12.0",
  "@react-navigation/native": "^6.x"
}
```

### Using npm

```bash
npm install @masumdev/bottom-sheet
```

### Using yarn

```bash
yarn add @masumdev/bottom-sheet
```

### Using bun

```bash
bun add @masumdev/bottom-sheet
```

### Using pnpm

```bash
pnpm add @masumdev/bottom-sheet
```

## Basic Usage

1. Wrap your app with `BottomSheetProvider`:

```jsx
import React from 'react';
import { View } from 'react-native';
import { BottomSheetProvider } from '@masumdev/bottom-sheet';

export default function App() {
  return (
    <BottomSheetProvider>
      <View style={{ flex: 1 }}>
        {/* Your app content */}
      </View>
    </BottomSheetProvider>
  );
}
```

2. Use the `useBottomSheet` hook in your components:

```jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useBottomSheet } from '@masumdev/bottom-sheet';

export default function MyComponent() {
  const { expand, setContent, setSheetTitle } = useBottomSheet('50%');

  const showProfile = () => {
    setSheetTitle('Profile Details');
    setContent(
      <View>
        <Text>Name: John Doe</Text>
        <Button title="Close" onPress={close} />
      </View>
    );
    expand();
  };

  return (
    <View>
      <Button title="Show Profile" onPress={showProfile} />
    </View>
  );
}
```

## Advanced Usage

### Custom Configuration

```jsx
import { BottomSheetProvider } from '@masumdev/bottom-sheet';

<BottomSheetProvider
  defaultSnapTo="50%"
  maxSnapTo="80%"
  backgroundColor="#F5F5F5"
  backDropColor="rgba(0,0,0,0.7)"
  onStateChange={(isOpen) => console.log('Sheet is open:', isOpen)}
>
  <App />
</BottomSheetProvider>
```

### Dynamic Height Adjustment

```jsx
import { useBottomSheet } from '@masumdev/bottom-sheet';

const { expand, setContent } = useBottomSheet();

const showHalfSheet = () => {
  setContent(<Text>Half Sheet Content</Text>);
  expand('50%'); // Override default height
};
```

## API Reference

### BottomSheetProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultSnapTo | string | '70%' | Default height of the bottom sheet |
| maxSnapTo | string | '90%' | Maximum height the bottom sheet can expand to |
| backgroundColor | string | '#FFFFFF' | Background color of the bottom sheet |
| backDropColor | string | 'rgba(0,0,0,0.5)' | Color of the backdrop overlay |
| onStateChange | function | - | Callback when bottom sheet state changes |

### useBottomSheet Hook

The hook returns an object with the following methods:

| Method | Type | Description |
|--------|------|-------------|
| isOpen | boolean | Current state of the bottom sheet |
| isLoading | boolean | Loading state of the bottom sheet |
| expand | function | Opens the bottom sheet with optional height |
| close | function | Closes the bottom sheet |
| toggle | function | Toggles the bottom sheet state |
| setContent | function | Sets the content of the bottom sheet |
| setSheetTitle | function | Sets the title of the bottom sheet |
| setSnapTo | function | Sets the height of the bottom sheet |

## License

MIT