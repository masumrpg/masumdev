import 'react-native-reanimated';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const nonHeaderPatshs = ['/scroll-to-hide', '/qrcode-pack/qr-scanner'];

export default function RootLayout() {
  const pathName = usePathname();

  const isNonHeaderPath = nonHeaderPatshs.includes(pathName);

  const formattedTitle =
    pathName === '/'
      ? 'Masumdev'
      : pathName
          .replace(/^\//, '')
          .replace(/\./g, '')
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

  return (
    <>
      <StatusBar style={pathName === '/scroll-to-hide' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          title: formattedTitle,
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerShown: isNonHeaderPath ? false : true,
        }}
      />
    </>
  );
}
