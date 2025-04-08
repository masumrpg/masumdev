# @masumdev/rn-toast

A simple toast for React Native, inspired by Samsung notifications. This library provides a lightweight toast component with smooth animations and anti-spam protection, ensuring a seamless user experience.

<div style="display: flex; gap: 8px;">
  <img src="https://img.shields.io/npm/v/@masumdev%2Frn-toast" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/@masumdev%2Frn-toast" alt="npm downloads" />
  <img src="https://img.shields.io/badge/platforms-android%20|%20ios-lightgrey.svg" alt="platforms" />
  <img src="https://img.shields.io/badge/Expo-compatible-9cf.svg" alt="expo compatible" />
  <img src="https://img.shields.io/badge/New-2025-brightgreen" alt="New Feature" />
  <img src="https://img.shields.io/badge/New-Custom_Position-brightgreen" alt="New Feature" />
</div>


## Demo

<p align="center">
  <img src="./iphone-demo-toast.gif" alt="Toast Demo Iphone" width="45%" height="auto" style="vertical-align: top;" />
  <img src="./demo-toast.gif" alt="Toast Demo" width="45%" height="auto" style="vertical-align: top;" />
</p>

### Tutorial Video
<p align="center">
  <iframe
    width="100%"
    height="500"
    src="https://www.youtube.com/embed/ytdpXMd1fqU"
    title="React Native Toast Demo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</p>

*Demo showing various toast notifications: success, error, and info types with smooth animations and anti-spam protection*

## Features

- 🚀 Lightweight and performant
- 🎨 Customizable styling
- 🔄 Animation using React Native Reanimated
- 📱 Works on iOS and Android
- 📚 TypeScript support
- 🧠 Smart queueing system for multiple toasts
- ✨ **NEW!** Custom toast positioning from top

## Installation

1. Make sure you have these peer dependencies installed in your React Native project:

    ```json
    {
      "react-native-reanimated": "^3.xx",
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
    npm install @masumdev/rn-toast
    # or
    yarn add @masumdev/rn-toast
    # or
    pnpm install @masumdev/rn-toast
    # or
    bun add @masumdev/rn-toast
    ```

## Usage

### Basic Setup

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

### Customization Options

You can customize the duration, animation speed, and position from top:

```jsx
// Custom duration (8 seconds)
showToast('This will stay longer', 'info', { duration: 8000 });

// Custom animation speed (200ms)
showToast('Quick animation', 'success', { animationDuration: 200 });

// ✨ NEW FEATURE! Custom position from top (120px)
showToast('Custom position', 'info', { position: 120 }); // Customize the distance from top!
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

## License

MIT