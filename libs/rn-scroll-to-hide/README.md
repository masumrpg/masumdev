# @masumdev/rn-scroll-to-hide

[![npm version](https://badge.fury.io/js/@masumdev%2Frn-scroll-to-hide.svg)](https://badge.fury.io/js/@masumdev%2Frn-scroll-to-hide)

A lightweight and performant React Native hook for creating hide/show animations on scroll. Perfect for headers, footers, or any component that should hide based on scroll direction. Built with smooth animations and optimized performance.

## Demo

<p align="center">
  <img src="./android.gif" alt="Header Demo" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./iphone.gif" alt="Tabbar Demo" width="45%" height="auto" style="vertical-align: top;" />
</p>

## Features

- 🚀 Lightweight and performant
- 🎨 Customizable animations
- 🔄 Built with React Native Reanimated
- 📱 Works on iOS and Android
- 📚 TypeScript support
- 🎯 Support for both top and bottom components
- 🔍 Smart bounce detection

## Installation

```bash
npm install @masumdev/rn-scroll-to-hide
# or
yarn add @masumdev/rn-scroll-to-hide
# or
pnpm install @masumdev/rn-scroll-to-hide
# or
bun add @masumdev/rn-scroll-to-hide
```

### Dependencies

This package requires the following peer dependencies:
- `react-native-reanimated` >= 3.0.0

Make sure to follow the [react-native-reanimated installation instructions](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation).

## Usage

### Basic Setup

```tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useHideOnScroll, HideDirection } from '@masumdev/rn-scroll-to-hide';

export default function App() {
  const header = useHideOnScroll({
    height: 60,
    hideDirection: HideDirection.UP
  });

  const tabbar = useHideOnScroll({
    height: 60,
    hideDirection: HideDirection.DOWN
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.header, header.animatedStyle]}>
        <Text>Header</Text>
      </Animated.View>

      <ScrollView
        onScroll={header.onScroll}
        scrollEventThrottle={16}
      >
        {/* Your content */}
      </ScrollView>

      <Animated.View style={[styles.tabbar, tabbar.animatedStyle]}>
        <Text>Tabbar</Text>
      </Animated.View>
    </View>
  );
}
```

### Configuration Options

You can customize the behavior with these options:

```tsx
const header = useHideOnScroll({
  height: 60, // Component height (required)
  duration: 300, // Animation duration in ms (default: 300)
  threshold: 10, // Minimum scroll distance to trigger (default: 10)
  hideOnScrollDown: true, // Hide when scrolling down (default: true)
  hideDirection: HideDirection.UP // Direction to hide (default: DOWN)
});
```

### Advanced Usage

Control visibility programmatically:

```tsx
const { animatedStyle, onScroll, forceShow, forceHide } = useHideOnScroll({
  height: 60
});

// Force show the component
const handleTabPress = () => {
  forceShow();
};

// Force hide the component
const handleModalOpen = () => {
  forceHide();
};
```

## API Reference

### useHideOnScroll Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| height | number | required | Height of the component to hide |
| duration | number | 300 | Animation duration in milliseconds |
| threshold | number | 10 | Minimum scroll distance to trigger hide/show |
| hideOnScrollDown | boolean | true | Whether to hide when scrolling down |
| hideDirection | HideDirection | DOWN | Direction to hide the component |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| animatedStyle | object | Animated style to be applied to component |
| onScroll | function | Scroll event handler |
| scrollY | SharedValue | Current scroll position |
| forceShow | function | Force show the component |
| forceHide | function | Force hide the component |

## License

MIT

## Author

**Ma'sum** - *React Native Developer from Indonesia*

I'm a React Native developer passionate about creating smooth and performant mobile applications. This scroll-to-hide library is part of my commitment to the React Native community, providing simple yet powerful solutions for common UI needs.

- 📱 React Native Developer
- 🇮🇩 Based in Indonesia
- 🔧 Focused on building reusable and performant components
- 💻 Open source contributor

Feel free to reach out for questions, suggestions, or collaborations!

---
Built with ❤️ in Indonesia
