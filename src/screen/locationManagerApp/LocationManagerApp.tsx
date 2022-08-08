import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Location from './screen/Location';
import MapsView from './screen/MapsView';
const Tab = createBottomTabNavigator();
export default function LocationManagerApp() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="MapView" component={MapsView} />
    </Tab.Navigator>
  );
}
