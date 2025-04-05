# @masumdev/rn-bottom-sheet

A highly customizable and gesture-responsive bottom sheet component for React Native applications.

[![npm version](https://badge.fury.io/js/@masumdev%2Frn-scroll-to-hide.svg)](https://badge.fury.io/js/@masumdev%2Frn-bottom-sheet)

## Demo

<p align="center">
  <img src="./android.gif" alt="Toast Demo Iphone" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./iphone.gif" alt="Toast Demo" width="45%" height="auto" style="vertical-align: top;" />
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
npm install @masumdev/rn-bottom-sheet
```

### Using yarn

```bash
yarn add @masumdev/rn-bottom-sheet
```

### Using bun

```bash
bun add @masumdev/rn-bottom-sheet
```

### Using pnpm

```bash
pnpm add @masumdev/rn-bottom-sheet
```

## Basic Usage

1. Wrap your app with `BottomSheetProvider`:

```jsx
import React from 'react';
import { View } from 'react-native';
import { BottomSheetProvider } from '@masumdev/rn-bottom-sheet';

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
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useBottomSheet } from '@masumdev/rn-bottom-sheet';

const SAMPLE_DATA = [
  { id: '1', title: 'Item 1', description: 'Description for item 1' },
  { id: '2', title: 'Item 2', description: 'Description for item 2' },
  // ... more items
];

export default function BottomSheetExample() {
  const {
    expand,
    close,
    setContent,
    setSheetTitle,
    setVariant,
    setListData,
    setRenderItem,
    setSnapTo,
  } = useBottomSheet();

  // Example of showing a ScrollView bottom sheet
  const showScrollExample = () => {
    setVariant('scroll');
    setSheetTitle('Scroll Example');
    setContent(
      <View>
        <Text style={styles.description}>
          This is an example of the bottom sheet with ScrollView.
          You can add any content here.
        </Text>
        <Button title="Close" onPress={close} />
      </View>
    );
    setSnapTo('100%');
    expand('30%');
  };

  // Example of showing a FlatList bottom sheet
  const showFlatListExample = () => {
    setVariant('flatlist');
    setSheetTitle('FlatList Example');
    setContent(
      <View>
        <Text>This is an example with FlatList. Below is a list of items:</Text>
      </View>
    );
    setListData(SAMPLE_DATA);
    setRenderItem(({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setVariant('scroll');
          setSheetTitle(`Details for ${item.title}`);
          setContent(
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Button title="Back to List" onPress={showFlatListExample} />
              <Button title="Close" onPress={close} />
            </View>
          );
          expand('80%');
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    ));
    expand('50%');
  };

  return (
    <View>
      <Button title="Show Scroll Example" onPress={showScrollExample} />
      <Button title="Show FlatList Example" onPress={showFlatListExample} />
    </View>
  );
}
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