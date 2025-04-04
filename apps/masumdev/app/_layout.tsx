import 'react-native-reanimated';
import { BottomSheetProvider } from '@masumdev/bottom-sheet';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Toaster } from '@masumdev/rn-toast';

export default function RootLayout() {
  return (
    <BottomSheetProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Masumdev',
          }}
        />
      </Stack>
      <Toaster />
    </BottomSheetProvider>
  );
}
