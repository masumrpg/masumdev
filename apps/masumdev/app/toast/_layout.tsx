import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Toaster } from '@masumdev/rn-toast';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toaster />
    </>
  );
}
