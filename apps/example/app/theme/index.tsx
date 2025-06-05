// import React from 'react';
// import { View, Text, TouchableOpacity, Switch } from 'react-native';
// import { useTheme, useThemedStyles, Theme } from 'rnc-theme'

// const ThemeScreen: React.FC = () => {
//   const { themeMode, setThemeMode, isDark, updateCustomTheme, resetTheme } =
//     useTheme();
//   const styles = useThemedStyles(createStyles);

//   const toggleTheme = () => {
//     setThemeMode(isDark ? 'light' : 'dark');
//   };

//   const customizeTheme = () => {
//     updateCustomTheme({
//       colors: {
//         primary: isDark ? '#FF6B6B' : '#4ECDC4',
//         secondary: isDark ? '#FFE66D' : '#45B7D1',
//         background: '',
//         surface: '',
//         text: '',
//         textSecondary: '',
//         border: '',
//         error: '',
//         warning: '',
//         success: '',
//         info: ''
//       },
//       borderRadius: {
//         md: 16,
//         lg: 24,
//         sm: 0,
//         xl: 0
//       },
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Theme System Demo</Text>
//       <Text style={styles.subtitle}>Current mode: {themeMode}</Text>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Theme Controls</Text>

//         <View style={styles.row}>
//           <Text style={styles.label}>Dark Mode</Text>
//           <Switch value={isDark} onValueChange={toggleTheme} />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={customizeTheme}>
//           <Text style={styles.buttonText}>Apply Custom Colors</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.secondaryButton]}
//           onPress={resetTheme}
//         >
//           <Text style={[styles.buttonText, styles.secondaryButtonText]}>
//             Reset Theme
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.colorPalette}>
//         <Text style={styles.cardTitle}>Color Palette</Text>
//         <View style={styles.colorsRow}>
//           <View
//             style={[
//               styles.colorBox,
//               { backgroundColor: styles.primary.backgroundColor },
//             ]}
//           />
//           <View
//             style={[
//               styles.colorBox,
//               { backgroundColor: styles.secondary.backgroundColor },
//             ]}
//           />
//           <View
//             style={[
//               styles.colorBox,
//               { backgroundColor: styles.success.backgroundColor },
//             ]}
//           />
//           <View
//             style={[
//               styles.colorBox,
//               { backgroundColor: styles.error.backgroundColor },
//             ]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const createStyles = (theme: Theme) => ({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.background,
//     padding: theme.spacing.md,
//   },
//   title: {
//     fontSize: theme.typography.heading.fontSize,
//     lineHeight: theme.typography.heading.lineHeight,
//     color: theme.colors.text,
//     fontWeight: 'bold' as const,
//     marginBottom: theme.spacing.md,
//   },
//   subtitle: {
//     fontSize: theme.typography.body.fontSize,
//     color: theme.colors.textSecondary,
//     marginBottom: theme.spacing.lg,
//   },
//   card: {
//     backgroundColor: theme.colors.surface,
//     borderRadius: theme.borderRadius.lg,
//     padding: theme.spacing.md,
//     marginBottom: theme.spacing.lg,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   cardTitle: {
//     fontSize: theme.typography.subtitle.fontSize,
//     color: theme.colors.text,
//     fontWeight: '600' as const,
//     marginBottom: theme.spacing.md,
//   },
//   row: {
//     flexDirection: 'row' as const,
//     justifyContent: 'space-between' as const,
//     alignItems: 'center' as const,
//     marginBottom: theme.spacing.md,
//   },
//   label: {
//     fontSize: theme.typography.body.fontSize,
//     color: theme.colors.text,
//   },
//   button: {
//     backgroundColor: theme.colors.primary,
//     borderRadius: theme.borderRadius.md,
//     padding: theme.spacing.md,
//     alignItems: 'center' as const,
//     marginBottom: theme.spacing.sm,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: theme.typography.body.fontSize,
//     fontWeight: '600' as const,
//   },
//   secondaryButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   secondaryButtonText: {
//     color: theme.colors.text,
//   },
//   colorPalette: {
//     backgroundColor: theme.colors.surface,
//     borderRadius: theme.borderRadius.lg,
//     padding: theme.spacing.md,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   colorsRow: {
//     flexDirection: 'row' as const,
//     justifyContent: 'space-around' as const,
//   },
//   colorBox: {
//     width: 40,
//     height: 40,
//     borderRadius: theme.borderRadius.sm,
//   },
//   primary: {
//     backgroundColor: theme.colors.primary,
//   },
//   secondary: {
//     backgroundColor: theme.colors.secondary,
//   },
//   success: {
//     backgroundColor: theme.colors.success,
//   },
//   error: {
//     backgroundColor: theme.colors.error,
//   },
// });

// export default ThemeScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Theme, useTheme, useThemedStyles } from 'rnc-theme';

const ExampleScreen: React.FC = () => {
  const { themeMode, setThemeMode, isDark, updateCustomTheme, resetTheme } =
    useTheme();
  const styles = useThemedStyles(createStyles);

  // State untuk demo components
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState(3);

  const toggleTheme = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  const customizeTheme = () => {
    updateCustomTheme({
      colors: {
        primary: isDark ? '#FF6B6B' : '#4ECDC4',
        secondary: isDark ? '#FFE66D' : '#45B7D1',
      },
      borderRadius: {
        md: 16,
        lg: 24,
      },
    });
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success!', 'Operation completed successfully');
    }, 2000);
  };

  const demoData = [
    {
      id: '1',
      title: 'Dashboard',
      subtitle: 'View analytics and reports',
      icon: '📊',
    },
    {
      id: '2',
      title: 'Profile',
      subtitle: 'Manage your account settings',
      icon: '👤',
    },
    {
      id: '3',
      title: 'Settings',
      subtitle: 'App preferences and configuration',
      icon: '⚙️',
    },
    {
      id: '4',
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      icon: '🔔',
    },
    {
      id: '5',
      title: 'Help & Support',
      subtitle: 'Get assistance and FAQs',
      icon: '❓',
    },
  ];

  const renderListItem = ({ item }: { item: (typeof demoData)[0] }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        selectedItem === item.id && styles.listItemSelected,
      ]}
      onPress={() => setSelectedItem(item.id)}
    >
      <Text style={styles.listItemIcon}>{item.icon}</Text>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.listItemArrow}>
        <Text style={styles.listItemArrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>🎨 Theme System Demo</Text>
          <Text style={styles.subtitle}>Current mode: {themeMode}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>React Native + React 19</Text>
          </View>
        </View>

        {/* Theme Controls Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎛️ Theme Controls</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: styles.switchTrack.backgroundColor,
                true: styles.switchTrackActive.backgroundColor,
              }}
              thumbColor={
                isDark
                  ? styles.switchThumbActive.color
                  : styles.switchThumb.color
              }
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={customizeTheme}>
            <Text style={styles.buttonText}>🎨 Apply Custom Colors</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={resetTheme}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              🔄 Reset Theme
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Components */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Input Components</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Enter some text..."
            placeholderTextColor={styles.placeholder.color}
            value={inputValue}
            onChangeText={setInputValue}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.textInput, styles.flexInput]}
              placeholder="Search..."
              placeholderTextColor={styles.placeholder.color}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Palette */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎨 Color Palette</Text>
          <View style={styles.colorsGrid}>
            <View style={styles.colorItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: styles.primary.backgroundColor },
                ]}
              />
              <Text style={styles.colorLabel}>Primary</Text>
            </View>
            <View style={styles.colorItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: styles.secondary.backgroundColor },
                ]}
              />
              <Text style={styles.colorLabel}>Secondary</Text>
            </View>
            <View style={styles.colorItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: styles.success.backgroundColor },
                ]}
              />
              <Text style={styles.colorLabel}>Success</Text>
            </View>
            <View style={styles.colorItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: styles.error.backgroundColor },
                ]}
              />
              <Text style={styles.colorLabel}>Error</Text>
            </View>
            <View style={styles.colorItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: styles.warning.backgroundColor },
                ]}
              />
              <Text style={styles.colorLabel}>Warning</Text>
            </View>
            <View style={styles.colorItem}>
              <View
                style={[
                  styles.colorBox,
                  { backgroundColor: styles.info.backgroundColor },
                ]}
              />
              <Text style={styles.colorLabel}>Info</Text>
            </View>
          </View>
        </View>

        {/* Button Variants */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔘 Button Variants</Text>

          <TouchableOpacity style={styles.button} onPress={simulateLoading}>
            <Text style={styles.buttonText}>Primary Button</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Secondary Button
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.successButton]}>
            <Text style={styles.buttonText}>✅ Success Button</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.errorButton]}>
            <Text style={styles.buttonText}>❌ Error Button</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.warningButton]}>
            <Text style={styles.buttonText}>⚠️ Warning Button</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.smallButton]}>
              <Text style={[styles.buttonText, styles.smallButtonText]}>
                Small
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]}>
              <Text style={[styles.buttonText, styles.outlinedButtonText]}>
                Outlined
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Badge */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔔 Badges & Indicators</Text>

          <View style={styles.badgeRow}>
            <View style={styles.notificationItem}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notificationCount}
                </Text>
              </View>
            </View>

            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, styles.onlineStatus]} />
              <Text style={styles.statusText}>Online</Text>
            </View>

            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, styles.offlineStatus]} />
              <Text style={styles.statusText}>Offline</Text>
            </View>
          </View>

          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>React Native</Text>
            </View>
            <View style={[styles.tag, styles.primaryTag]}>
              <Text style={[styles.tagText, styles.primaryTagText]}>
                TypeScript
              </Text>
            </View>
            <View style={[styles.tag, styles.successTag]}>
              <Text style={[styles.tagText, styles.successTagText]}>
                Theme System
              </Text>
            </View>
          </View>
        </View>

        {/* List Component */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 List Components</Text>
          <FlatList
            data={demoData}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Loading States */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⏳ Loading States</Text>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={simulateLoading}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={[styles.buttonText, styles.loadingText]}>
                  Loading...
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Simulate Loading</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loadingRow}>
            <ActivityIndicator
              color={styles.activityIndicator.color}
              size="small"
            />
            <ActivityIndicator
              color={styles.activityIndicator.color}
              size="large"
            />
            <View style={styles.customLoader}>
              <View style={styles.loaderDot1} />
              <View style={styles.loaderDot2} />
              <View style={styles.loaderDot3} />
            </View>
          </View>
        </View>

        {/* Typography Showcase */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📰 Typography</Text>

          <Text style={styles.headingText}>Heading Text</Text>
          <Text style={styles.titleText}>Title Text</Text>
          <Text style={styles.subtitleText}>Subtitle Text</Text>
          <Text style={styles.bodyText}>
            Body text for regular content and paragraphs
          </Text>
          <Text style={styles.smallText}>
            Small text for captions and footnotes
          </Text>
          <Text style={styles.linkText}>Link text with primary color</Text>
        </View>

        {/* Modal Trigger */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🪟 Modal & Overlay</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Open Modal</Text>
          </TouchableOpacity>
        </View>

        {/* Spacing Demo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📏 Spacing System</Text>

          <View style={styles.spacingDemo}>
            <View style={[styles.spacingBox, styles.spacingXs]}>
              <Text style={styles.spacingLabel}>XS</Text>
            </View>
            <View style={[styles.spacingBox, styles.spacingSm]}>
              <Text style={styles.spacingLabel}>SM</Text>
            </View>
            <View style={[styles.spacingBox, styles.spacingMd]}>
              <Text style={styles.spacingLabel}>MD</Text>
            </View>
            <View style={[styles.spacingBox, styles.spacingLg]}>
              <Text style={styles.spacingLabel}>LG</Text>
            </View>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Modal Example</Text>
            <Text style={styles.modalText}>
              This is a sample modal using the theme system. Notice how all
              colors and spacing adapt to the current theme.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.secondaryButton,
                  styles.modalButton,
                ]}
                onPress={() => {
                  setModalVisible(false);
                  Alert.alert('Action', 'Secondary action triggered!');
                }}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Action
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center' as const,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    lineHeight: theme.typography.heading.lineHeight,
    color: theme.colors.text,
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
    textAlign: 'center' as const,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    marginTop: theme.spacing.md,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: theme.typography.small.fontSize,
    fontWeight: '600' as const,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
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
  successButton: {
    backgroundColor: theme.colors.success,
  },
  errorButton: {
    backgroundColor: theme.colors.error,
  },
  warningButton: {
    backgroundColor: theme.colors.warning,
  },
  buttonRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: theme.spacing.sm,
  },
  smallButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
  },
  smallButtonText: {
    fontSize: theme.typography.small.fontSize,
  },
  outlinedButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
  },
  outlinedButtonText: {
    color: theme.colors.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.sm,
  },
  loadingText: {
    marginLeft: theme.spacing.sm,
  },
  loadingRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    marginTop: theme.spacing.md,
  },
  customLoader: {
    flexDirection: 'row' as const,
    gap: theme.spacing.xs,
  },
  loaderDot1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    opacity: 0.4,
  },
  loaderDot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    opacity: 0.7,
  },
  loaderDot3: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
    alignItems: 'center' as const,
  },
  flexInput: {
    flex: 1,
    marginBottom: 0,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    aspectRatio: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  searchButtonText: {
    fontSize: 18,
  },
  placeholder: {
    color: theme.colors.textSecondary,
  },
  colorsGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: theme.spacing.md,
    justifyContent: 'space-between' as const,
  },
  colorItem: {
    alignItems: 'center' as const,
    width: '30%',
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  colorLabel: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    textAlign: 'center' as const,
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
  warning: {
    backgroundColor: theme.colors.warning,
  },
  info: {
    backgroundColor: theme.colors.info,
  },
  badgeRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    marginBottom: theme.spacing.md,
  },
  notificationItem: {
    position: 'relative' as const,
  },
  notificationIcon: {
    fontSize: 32,
  },
  notificationBadge: {
    position: 'absolute' as const,
    top: -2,
    right: -2,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  statusIndicator: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onlineStatus: {
    backgroundColor: theme.colors.success,
  },
  offlineStatus: {
    backgroundColor: theme.colors.textSecondary,
  },
  statusText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
  },
  tagContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: theme.spacing.sm,
  },
  tag: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  tagText: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
  },
  primaryTag: {
    backgroundColor: theme.colors.primary + '20',
  },
  primaryTagText: {
    color: theme.colors.primary,
  },
  successTag: {
    backgroundColor: theme.colors.success + '20',
  },
  successTagText: {
    color: theme.colors.success,
  },
  listItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  listItemSelected: {
    backgroundColor: theme.colors.primary + '10',
  },
  listItemIcon: {
    fontSize: 24,
    marginRight: theme.spacing.md,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    fontWeight: '600' as const,
  },
  listItemSubtitle: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  listItemArrow: {
    marginLeft: theme.spacing.sm,
  },
  listItemArrowText: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  headingText: {
    fontSize: theme.typography.heading.fontSize,
    lineHeight: theme.typography.heading.lineHeight,
    color: theme.colors.text,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.sm,
  },
  titleText: {
    fontSize: theme.typography.title.fontSize,
    lineHeight: theme.typography.title.lineHeight,
    color: theme.colors.text,
    fontWeight: '600' as const,
    marginBottom: theme.spacing.sm,
  },
  subtitleText: {
    fontSize: theme.typography.subtitle.fontSize,
    lineHeight: theme.typography.subtitle.lineHeight,
    color: theme.colors.text,
    fontWeight: '500' as const,
    marginBottom: theme.spacing.sm,
  },
  bodyText: {
    fontSize: theme.typography.body.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  smallText: {
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  linkText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.typography.title.fontSize,
    color: theme.colors.text,
    fontWeight: 'bold' as const,
    marginBottom: theme.spacing.md,
    textAlign: 'center' as const,
  },
  modalText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    lineHeight: theme.typography.body.lineHeight,
    marginBottom: theme.spacing.lg,
    textAlign: 'center' as const,
  },
  modalButtons: {
    flexDirection: 'row' as const,
    gap: theme.spacing.sm,
  },
  modalButton: {
    flex: 1,
    marginBottom: 0,
  },
  spacingDemo: {
    alignItems: 'flex-start' as const,
    gap: theme.spacing.sm,
  },
  spacingBox: {
    backgroundColor: theme.colors.primary + '30',
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  spacingLabel: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.primary,
    fontWeight: '600' as const,
  },
  spacingXs: {
    padding: theme.spacing.xs,
  },
  spacingSm: {
    padding: theme.spacing.sm,
  },
  spacingMd: {
    padding: theme.spacing.md,
  },
  spacingLg: {
    padding: theme.spacing.lg,
  },
  bottomPadding: {
    height: theme.spacing.xxl,
  },
  switchTrack: {
    backgroundColor: theme.colors.border,
  },
  switchTrackActive: {
    backgroundColor: theme.colors.primary + '80',
  },
  switchThumb: {
    color: theme.colors.background,
  },
  switchThumbActive: {
    color: theme.colors.primary,
  },
  activityIndicator: {
    color: theme.colors.primary,
  },
});

export default ExampleScreen;