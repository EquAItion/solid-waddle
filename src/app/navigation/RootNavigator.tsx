import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../../features/splash/SplashScreen';
import {OnboardingScreen} from '../../features/onboarding/OnboardingScreen';
import {AuthGatewayScreen} from '../../features/auth/AuthGatewayScreen';
import {HomeFeedScreen} from '../../features/home/HomeFeedScreen';
import {SearchFilterScreen} from '../../features/search/SearchFilterScreen';
import {FlightDetailScreen} from '../../features/flight-detail/FlightDetailScreen';
import {CheckoutTravelerScreen} from '../../features/checkout/CheckoutTravelerScreen';
import {CheckoutPaymentScreen} from '../../features/checkout/CheckoutPaymentScreen';
import {TravelerDetails} from '../../features/checkout/types';
import {colors} from '../../shared/theme/tokens';
import {ThemeProvider} from '../../shared/theme/ThemeProvider';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  AuthGateway: undefined;
  HomeFeed: undefined;
  SearchFilter: undefined;
  FlightDetail: {flightId: string};
  CheckoutTraveler: {flightId: string};
  CheckoutPayment: {flightId: string; traveler: TravelerDetails};
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
          <Stack.Screen
            name="SearchFilter"
            component={SearchFilterScreen}
            options={{presentation: 'modal', animation: 'slide_from_bottom'}}
          />
          <Stack.Screen name="FlightDetail" component={FlightDetailScreen} />
          <Stack.Screen name="CheckoutTraveler" component={CheckoutTravelerScreen} />
          <Stack.Screen name="CheckoutPayment" component={CheckoutPaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}