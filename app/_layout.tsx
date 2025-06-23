import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'Review Aggregator'
          }}
        />
        <Stack.Screen
          name="search/index"
          options={{
            title: 'Search Restaurants',
            headerBackTitle: 'Home'
          }}
        />
        <Stack.Screen
          name="restaurant/[id]"
          options={{
            title: 'Restaurant Details',
            headerBackTitle: 'Search'
          }}
        />
        <Stack.Screen
          name="favorites/index"
          options={{
            title: 'My Favorites',
            headerBackTitle: 'Home'
          }}
        />
        <Stack.Screen
          name="history/index"
          options={{
            title: 'Search History',
            headerBackTitle: 'Home'
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
