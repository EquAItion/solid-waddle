import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../../features/splash/SplashScreen';
import {OnboardingScreen} from '../../features/onboarding/OnboardingScreen';
import {AuthGatewayScreen} from '../../features/auth/AuthGatewayScreen';
import {HomeFeedScreen} from '../../features/home/HomeFeedScreen';
import {colors} from '../../shared/theme/tokens';
import {ThemeProvider} from '../../shared/theme/ThemeProvider';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  AuthGateway: undefined;
  HomeFeed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.charcoal,
    card: colors.charcoal,
    text: colors.ivory,
    border: colors.deepSlate,
    primary: colors.gold
  }
};

export function RootNavigator() {
  return (
    <ThemeProvider>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="AuthGateway" component={AuthGatewayScreen} />
          <Stack.Screen name="HomeFeed" component={HomeFeedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}