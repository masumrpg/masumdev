# @masumdev/rn-toast [![npm version](https://badge.fury.io/js/@masumdev%2Frn-toast.svg)](https://badge.fury.io/js/@masumdev%2Frn-toast)

A simple toast for React Native, inspired by Samsung notifications. This library provides a lightweight toast component with smooth animations and anti-spam protection, ensuring a seamless user experience.

## Demo

<p align="center">
  <img src="./iphone-demo-toast.gif" alt="Toast Demo Iphone" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./demo-toast.gif" alt="Toast Demo" width="45%" height="auto" style="vertical-align: top;" />
</p>

## Youtube Tutorial
<p align="center">
  <a href="https://www.youtube.com/watch?v=ytdpXMd1fqU" target="_blank">
    <img src="https://img.youtube.com/vi/ytdpXMd1fqU/maxresdefault.jpg"
      alt="React Native Toast Demo"
      width="600"
      style="border-radius: 10px"
    />
  </a>
</p>

## Features

- 🚀 Lightweight and performant
- 🎨 Customizable styling
- 🔄 Animation using React Native Reanimated
- 📱 Works on iOS and Android
- 📚 TypeScript support
- 🧠 Smart queueing system for multiple toasts

## Installation

### Prerequisites

Make sure you have these peer dependencies installed in your React Native project:

```json
{
  "react": "^18.3.1",
  "react-native": "^0.76.7",
  "react-native-reanimated": "^2.0.0"
}
```

### Using npm

```bash
npm install @masumdev/rn-toast
```

### Using yarn

```bash
yarn add @masumdev/rn-toast
```

### Using bun

```bash
bun add @masumdev/rn-toast
```

### Using pnpm

```bash
pnpm add @masumdev/rn-toast
```

Make sure to follow the [react-native-reanimated installation instructions](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation).

## Basic Usage

1. Add the `Toaster` component to your app's root component:

```jsx
import React from 'react';
import { View } from 'react-native';
import { Toaster } from '@masumdev/rn-toast';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Toaster />
      {/* Your app content */}
    </View>
  );
}
```

2. Use the `useToast` hook in your components:

```jsx
import React from 'react';
import { Button, View } from 'react-native';
import { useToast } from '@masumdev/rn-toast';

export default function MyComponent() {
  const { showToast } = useToast();

  const handlePress = () => {
    showToast('Operation successful!', 'success');
  };

  return (
    <View>
      <Button title="Show Toast" onPress={handlePress} />
    </View>
  );
}
```

## Advanced Usage

### Toast Types

The library supports three types of toasts:
- `info` (default)
- `success`
- `error`

```jsx
// Show an info toast
showToast('This is an info message');

// Show a success toast
showToast('Operation successful!', 'success');

// Show an error toast
showToast('Something went wrong', 'error');
```

### Custom Configuration

You can customize the duration and animation speed:

```jsx
// Custom duration (8 seconds)
showToast('This will stay longer', 'info', { duration: 8000 });

// Custom animation speed (200ms)
showToast('Quick animation', 'success', { animationDuration: 200 });
```

### Customizing the Toaster Component

You can customize the default behavior of the Toaster component:

```jsx
import React from 'react';
import { View } from 'react-native';
import { Toaster } from '@masumdev/rn-toast';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Toaster
        defaultDuration={3000} // 3 seconds default duration
        defaultAnimationDuration={300} // 300ms animation
        customIcons={{
          success: require('./assets/my-success-icon.png'),
          error: require('./assets/my-error-icon.png'),
          info: require('./assets/my-info-icon.png')
        }}
        customColors={{
          success: { background: '#e6ffe6', text: '#006600' },
          error: { background: '#ffe6e6', text: '#cc0000' },
          info: { background: '#e6f2ff', text: '#0066cc' }
        }}
      />
      {/* Your app content */}
    </View>
  );
}
```

### Manual Toast Control

You can manually hide toasts using the `hideToast` function:

```jsx
import React from 'react';
import { Button, View } from 'react-native';
import { useToast } from '@masumdev/rn-toast';

export default function MyComponent() {
  const { showToast, hideToast } = useToast();

  const showMessage = () => {
    showToast('This is a long toast message...', 'info', { duration: 10000 });
  };

  const hideMessage = () => {
    hideToast(() => {
      console.log('Toast was dismissed');
    });
  };

  return (
    <View>
      <Button title="Show Toast" onPress={showMessage} />
      <Button title="Hide Toast" onPress={hideMessage} />
    </View>
  );
}
```

## API Reference

### Toaster Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultDuration | number | 3000 | Default duration for toasts in milliseconds |
| defaultAnimationDuration | number | 300 | Default animation duration in milliseconds |
| customIcons | object | - | Custom icons for different toast types |
| customColors | object | - | Custom colors for different toast types |

### useToast Hook

The hook returns an object with the following methods:

| Method | Type | Description |
|--------|------|-------------|
| showToast | function | Shows a toast with message and type |
| hideToast | function | Hides the current toast |

## License

MIT

## Author

**Ma'sum** - *React Native Developer from Indonesia*

I'm a React Native developer passionate about creating smooth and performant mobile applications. This toast library is part of my commitment to the React Native community, providing simple yet powerful solutions for common UI needs.

- 📱 React Native Developer
- 🇮🇩 Based in Indonesia
- 🔧 Focused on building reusable and performant components
- 💻 Open source contributor

Feel free to reach out for questions, suggestions, or collaborations!

---
Built with ❤️ in Indonesia