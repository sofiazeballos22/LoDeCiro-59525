import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
//import Navigator from './src/navigation/Navigator'
import TabNavigation from './src/navigation/TabNavigation';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation';

SplashScreen.preventAutoHideAsync();


export default function App () {
  const [loaded, error] = useFonts({
    'Jacques': require('./assets/fonts/JacquesFrancoisShadow-Regular.ttf'),
    'Henny': require('./assets/fonts/HennyPenny-Regular.ttf')
  });



  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Provider store = {store}>
      <MainNavigation />
      <StatusBar style="light" />
      </Provider>
  )
}