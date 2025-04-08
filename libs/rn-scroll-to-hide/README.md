# @masumdev/rn-scroll-to-hide

A lightweight and performant React Native hook for creating hide/show animations on scroll. Perfect for headers, footers, or any component that should hide based on scroll direction. Built with smooth animations and optimized performance.

<div style="display: flex; gap: 8px;">
  <img src="https://img.shields.io/npm/v/@masumdev%2Frn-scroll-to-hide" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/@masumdev%2Frn-scroll-to-hide" alt="npm downloads" />
  <img src="https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg" alt="platforms" />
  <img src="https://img.shields.io/badge/Expo-compatible-9cf.svg" alt="expo compatible" />
  <img src="https://img.shields.io/badge/New-2025-brightgreen" alt="New Feature" />
</div>

## Demo

<p align="center">
  <img src="./android.gif" alt="Header Demo" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./iphone.gif" alt="Tabbar Demo" width="45%" height="auto" style="vertical-align: top;" />
</p>

## Youtube Tutorial
<p align="center">
  <iframe
    width="100%"
    height="500"
    src="https://www.youtube.com/embed/udjs1sdXJTU"
    title="React Native Toast Demo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
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

### Prerequisites

1. Make sure you have these peer dependencies installed in your React Native project:

    ```json
    {
      "react-native-reanimated": "^3.16.7",
    }
    ```

    ```bash
    npm install react react-native react-native-reanimated
    # or
    yarn add react react-native react-native-reanimated
    # or
    pnpm add react react-native react-native-reanimated
    # or
    bun add react react-native react-native-reanimated
    ```
2. Install the library:

    ```bash
    npm install @masumdev/rn-scroll-to-hide
    # or
    yarn add @masumdev/rn-scroll-to-hide
    # or
    pnpm install @masumdev/rn-scroll-to-hide
    # or
    bun add @masumdev/rn-scroll-to-hide
    ```

## Usage

### Basic Setup

```tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  useHideOnScroll,
  HideDirection,
  ScrollDirection,
} from '@masumdev/rn-scroll-to-hide';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Anda memiliki @expo/vector-icons

const TABBAR_HEIGHT = 70;
const HEADER_HEIGHT = 60;
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export default function ScrollToHideScreen() {
  const tabbar = useHideOnScroll({
    height: TABBAR_HEIGHT,
    duration: 300,
    threshold: 5,
    scrollDirection: ScrollDirection.DOWN,
    hideDirection: HideDirection.DOWN,
  });

  const header = useHideOnScroll({
    height: HEADER_HEIGHT,
    duration: 300,
    threshold: 5,
    scrollDirection: ScrollDirection.DOWN,
    hideDirection: HideDirection.UP,
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    tabbar.onScroll(event);
    header.onScroll(event);
  };

  const renderDummyContent = () => {
    const items = [];
    for (let i = 1; i <= 50; i++) {
      items.push(
        <View key={i} style={styles.item}>
          <Text style={styles.itemText}>Item {i}</Text>
        </View>
      );
    }
    return items;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, header.animatedStyle]}>
        <View style={styles.statusBar} />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>App Title</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderDummyContent()}
      </ScrollView>

      <Animated.View style={[styles.tabbar, tabbar.animatedStyle]}>
        <View style={styles.tab}>
          <Ionicons name="home-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Home</Text>
        </View>
        <View style={styles.tab}>
          <Ionicons name="search-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Search</Text>
        </View>
        <View style={styles.tab}>
          <Ionicons name="person-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Profile</Text>
        </View>
        <View style={styles.tab}>
          <Ionicons name="settings-outline" size={24} color="#5e72e4" />
          <Text style={styles.tabText}>Settings</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#5e72e4',
  },
  headerContent: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5e72e4',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingTop: HEADER_HEIGHT + STATUSBAR_HEIGHT,
  },
  scrollContent: {
    paddingBottom: TABBAR_HEIGHT + 20,
  },
  item: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
  },
  tabbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TABBAR_HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#5e72e4',
    marginTop: 4,
  },
});
```

### Configuration Options

You can customize the behavior with these options:

```tsx
const header = useHideOnScroll({
  height: 60, // Component height (required)
  duration: 300, // Animation duration in ms (default: 300)
  threshold: 10, // Minimum scroll distance to trigger (default: 10)
  scrollDirection: ScrollDirecton.DOWN, // Hide when scrolling down (default: DOWN)
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
| scrollDirection | ScrollDirection | DOWN | Whether to hide when scrolling down |
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