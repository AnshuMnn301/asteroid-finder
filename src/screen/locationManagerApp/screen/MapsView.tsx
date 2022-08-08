import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function MapsView() {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        width: 400,
        height: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
      }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{...StyleSheet.absoluteFillObject, flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // mapType="standard"
        // liteMode
        showsUserLocation
        zoomTapEnabled
        // loadingEnabled
      />
    </View>
  );
}
