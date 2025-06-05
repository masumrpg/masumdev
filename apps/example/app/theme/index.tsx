import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useTheme, useThemedStyles, Theme } from 'rnc-theme';

const ThemeScreen: React.FC = () => {
  const { themeMode, setThemeMode, isDark, updateCustomTheme, resetTheme } =
    useTheme();
  const styles = useThemedStyles(createStyles);

  const toggleTheme = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  const customizeTheme = () => {
    updateCustomTheme({
      colors: {
        primary: isDark ? '#FF6B6B' : '#4ECDC4',
        secondary: isDark ? '#FFE66D' : '#45B7D1',
        background: '',
        surface: '',
        text: '',
        textSecondary: '',
        border: '',
        error: '',
        warning: '',
        success: '',
        info: '',
      },
      borderRadius: {
        md: 16,
        lg: 24,
        sm: 0,
        xl: 0,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme System Demo</Text>
      <Text style={styles.subtitle}>Current mode: {themeMode}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Theme Controls</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity style={styles.button} onPress={customizeTheme}>
          <Text style={styles.buttonText}>Apply Custom Colors</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={resetTheme}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Reset Theme
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.colorPalette}>
        <Text style={styles.cardTitle}>Color Palette</Text>
        <View style={styles.colorsRow}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: styles.primary.backgroundColor },
            ]}
          />
          <View
            style={[
              styles.colorBox,
              { backgroundColor: styles.secondary.backgroundColor },
            ]}
          />
          <View
            style={[
              styles.colorBox,
              { backgroundColor: styles.success.backgroundColor },
            ]}
          />
          <View
            style={[
              styles.colorBox,
              { backgroundColor: styles.error.backgroundColor },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    lineHeight: theme.typography.heading.lineHeight,
    color: theme.colors.text,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.text,
    fontWeight: '600' as const,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  secondaryButtonText: {
    color: theme.colors.text,
  },
  colorPalette: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  colorsRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
});

export default ThemeScreen;
