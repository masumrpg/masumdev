import { BottomSheetProvider } from '@masumdev/rn-bottom-sheet';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <BottomSheetProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </BottomSheetProvider>
  );
}
