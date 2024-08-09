// REACT //
import { useEffect } from 'react';

// MODULES //
import { Stack } from 'expo-router';

// PLUGINS //
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

// STYLES //
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// CONTEXTS //
import { CoursesProvider } from '@/contexts/Courses.context';
import { AuthenticationProvider } from '@/contexts/Auth.context';

// OTHERS //
import { useColorScheme } from '@/hooks/useColorScheme';
import { SharedValueProvider } from '@/contexts/SharedValue.context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SharedValueProvider>
      <CoursesProvider>
        <AuthenticationProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ header: () => null }} />
              <Stack.Screen name="home/index" options={{ headerShown: false }} />
              <Stack.Screen name="module/index" options={{ headerShown: false }} />
              <Stack.Screen name="webview/index" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </AuthenticationProvider>
      </CoursesProvider>
    </SharedValueProvider>
  );
}
