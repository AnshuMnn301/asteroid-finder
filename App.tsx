/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import styles from './src/styles/global.styles';
import {StyleSheet} from 'react-native';
import AsteroidFinderApp from './src/screen/AsteroidFinderApp/AsteroidFinderApp';
export const ThemeContext = React.createContext(StyleSheet.create(styles));

export default function App() {
  return (
    <NavigationContainer>
      <ThemeContext.Provider value={styles}>
        <AsteroidFinderApp />
      </ThemeContext.Provider>
    </NavigationContainer>
  );
}
