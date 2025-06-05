# Project Rules - Theme System

## 📋 Overview
Dokumentasi ini berisi aturan dan guidelines untuk menggunakan Theme System dalam project React Native dengan React 19. Semua component harus mengikuti aturan ini untuk konsistensi dan maintainability.

## 🏗️ Architecture Rules

### 1. **File Structure**
```
src/
├── types/
│   └── theme.ts              # Theme type definitions
├── themes/
│   └── defaultThemes.ts      # Default light/dark themes
├── context/
│   └── ThemeContext.tsx      # Theme context & provider
├── hooks/
│   └── useThemedStyles.ts    # Styled components hook
├── components/
│   ├── ui/                   # Reusable UI components
│   └── screens/              # Screen components
└── utils/
    └── theme.ts              # Theme utilities (optional)
```

### 2. **Import Order** (wajib diikuti)
```typescript
// 1. React & React Native imports
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// 2. Third-party libraries
import AsyncStorage from '@react-native-async-storage/async-storage';

// 3. Internal hooks & context
import { useTheme } from '../context/ThemeContext';
import { useThemedStyles } from '../hooks/useThemedStyles';

// 4. Types
import { Theme } from '../types/theme';

// 5. Components (if any)
import CustomButton from '../components/ui/CustomButton';
```

## 🎨 Theme Usage Rules

### 1. **WAJIB menggunakan useThemedStyles**
❌ **JANGAN:**
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Hard-coded color
    padding: 16,                // Hard-coded spacing
  }
});
```

✅ **LAKUKAN:**
```typescript
const styles = useThemedStyles(createStyles);

const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  }
});
```

### 2. **Akses Theme Properties**
Selalu gunakan theme object untuk:
- **Colors**: `theme.colors.primary`, `theme.colors.text`
- **Spacing**: `theme.spacing.sm`, `theme.spacing.lg`
- **Typography**: `theme.typography.body.fontSize`
- **Border Radius**: `theme.borderRadius.md`
- **Sizes**: `theme.sizes.lg`

### 3. **Component Structure Pattern**
```typescript
interface MyComponentProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onPress,
  variant = 'primary'
}) => {
  const { theme, isDark } = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      style={[styles.container, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center' as const,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  text: {
    color: '#FFFFFF',
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
  },
});
```

## 🚫 Pantangan (JANGAN DILAKUKAN)

### 1. **Hard-coded Values**
```typescript
// ❌ JANGAN
backgroundColor: '#007AFF'
padding: 16
fontSize: 18
borderRadius: 8

// ✅ LAKUKAN
backgroundColor: theme.colors.primary
padding: theme.spacing.md
fontSize: theme.typography.body.fontSize
borderRadius: theme.borderRadius.md
```

### 2. **Direct StyleSheet.create**
```typescript
// ❌ JANGAN - langsung StyleSheet.create
const styles = StyleSheet.create({
  container: { ... }
});

// ✅ LAKUKAN - gunakan useThemedStyles
const styles = useThemedStyles(createStyles);
```

### 3. **Inline Styles untuk Theme Values**
```typescript
// ❌ JANGAN
<View style={{ backgroundColor: '#FFFFFF', padding: 16 }} />

// ✅ LAKUKAN
<View style={styles.container} />
```

### 4. **Menggunakan localStorage/sessionStorage**
```typescript
// ❌ JANGAN - tidak didukung di React Native
localStorage.setItem('theme', 'dark');

// ✅ LAKUKAN - gunakan AsyncStorage
AsyncStorage.setItem('theme', 'dark');
```

## ✅ Best Practices

### 1. **Color Naming Convention**
```typescript
// Gunakan semantic names, bukan literal colors
theme.colors.primary     // ✅ Good
theme.colors.text        // ✅ Good
theme.colors.error       // ✅ Good

theme.colors.blue        // ❌ Avoid
theme.colors.darkGray    // ❌ Avoid
```

### 2. **Component Props Design**
```typescript
interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}
```

### 3. **Conditional Theming**
```typescript
const createStyles = (theme: Theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    // Conditional berdasarkan theme colors
    borderColor: theme.colors.background === '#000000'
      ? theme.colors.border
      : 'transparent',
  }
});
```

### 4. **Typography Consistency**
```typescript
// Selalu gunakan predefined typography
const createStyles = (theme: Theme) => ({
  title: {
    fontSize: theme.typography.title.fontSize,
    lineHeight: theme.typography.title.lineHeight,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
  }
});
```

## 🔧 Custom Theme Extensions

### 1. **Extending Theme Types**
```typescript
// Jika perlu menambah theme properties
interface CustomTheme extends Theme {
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
  };
  animations: {
    fast: number;
    normal: number;
    slow: number;
  };
}
```

### 2. **Component-specific Theme**
```typescript
const updateCustomTheme = () => {
  updateCustomTheme({
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
    },
    spacing: {
      md: theme.spacing.md * 1.2, // 20% larger spacing
    }
  });
};
```

## 📱 Platform Specific Rules

### 1. **StatusBar Handling**
```typescript
// Selalu set StatusBar berdasarkan theme
<StatusBar
  barStyle={isDark ? 'light-content' : 'dark-content'}
  backgroundColor={theme.colors.background}
/>
```

### 2. **Safe Area Handling**
```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { top, bottom } = useSafeAreaInsets();
const styles = useThemedStyles((theme) => createStyles(theme, { top, bottom }));
```

## 🧪 Testing Guidelines

### 1. **Component Testing**
```typescript
// Test dengan kedua theme (light & dark)
describe('MyComponent', () => {
  it('renders correctly in light theme', () => {
    const wrapper = render(
      <ThemeProvider defaultTheme="light">
        <MyComponent />
      </ThemeProvider>
    );
    // Test assertions
  });

  it('renders correctly in dark theme', () => {
    const wrapper = render(
      <ThemeProvider defaultTheme="dark">
        <MyComponent />
      </ThemeProvider>
    );
    // Test assertions
  });
});
```

## 📦 Component Creation Checklist

Setiap kali membuat component baru, pastikan:

- [ ] ✅ Menggunakan `useThemedStyles` hook
- [ ] ✅ Import order sesuai rules
- [ ] ✅ TypeScript interfaces lengkap
- [ ] ✅ Tidak ada hard-coded colors/spacing
- [ ] ✅ Support both light & dark theme
- [ ] ✅ Semantic prop names (`variant`, `size`)
- [ ] ✅ Default props values
- [ ] ✅ Proper TypeScript const assertions
- [ ] ✅ Accessible (proper contrast, semantic markup)

## 🔍 Code Review Checklist

Saat review code, periksa:

- [ ] Apakah ada hard-coded theme values?
- [ ] Apakah menggunakan theme properties dengan benar?
- [ ] Apakah component responsive di light/dark theme?
- [ ] Apakah ada inline styles yang bisa dipindah ke createStyles?
- [ ] Apakah naming convention sudah konsisten?
- [ ] Apakah TypeScript types sudah lengkap?

## 🚀 Performance Tips

1. **Memoization**: `createStyles` function otomatis di-memoize oleh `useThemedStyles`
2. **Avoid Frequent Updates**: Jangan update custom theme terlalu sering
3. **Batch Updates**: Group multiple theme updates jadi satu
4. **Lazy Loading**: Load theme dari AsyncStorage async

## 📞 Troubleshooting

### Common Issues:

**1. "Cannot read property of undefined" pada theme**
- Pastikan component dibungkus dengan `<ThemeProvider>`
- Check import path `useTheme` hook

**2. "Styles tidak update saat theme berubah"**
- Pastikan menggunakan `useThemedStyles`, bukan `StyleSheet.create`
- Check apakah `createStyles` function referensi berubah

**3. "AsyncStorage error"**
- Pastikan install `@react-native-async-storage/async-storage`
- Check permissions untuk storage access

---

**🎯 Remember**: Konsistensi adalah kunci! Ikuti rules ini untuk codebase yang maintainable dan scalable.