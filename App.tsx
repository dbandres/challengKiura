/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from './src/screens/splash/SplashScreen';
import Navigator from './src/routes/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import MyStack from './src/routes/MyStack';

function App(): React.JSX.Element {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          {showSplash ? <SplashScreen /> : <MyStack />}
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}



export default App;
