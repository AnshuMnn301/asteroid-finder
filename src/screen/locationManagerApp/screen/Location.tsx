import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Button,
  Text,
  SectionList,
  ToastAndroid,
} from 'react-native';
import {
  LocationType,
  requestGeolocationPermission,
  reverseGeoCoding,
} from '../../../utils/apicalls';
import GeoLocation from 'react-native-geolocation-service';
import Item from '../../../components/Item';
import {ThemeContext} from '../../../../App';
export default function Location() {
  const styles = React.useContext(ThemeContext);
  const [places, setPlaces] = React.useState<{
    data: {title: string; data: LocationType[]}[];
    length: number;
  }>({
    data: [
      {
        title: 'Current Location',
        data: [],
      },
      {
        title: 'Previous Location',
        data: [],
      },
    ],
    length: 0,
  });
  useEffect(() => {
    let watchId: null | number = null;
    async function getLocationFuncStart() {
      const permissionGanted = await requestGeolocationPermission();
      if (
        permissionGanted?.['android.permission.ACCESS_COARSE_LOCATION'] ===
          'granted' &&
        permissionGanted['android.permission.ACCESS_FINE_LOCATION'] ===
          'granted'
      ) {
        watchId = GeoLocation.watchPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            const place = await reverseGeoCoding(latitude, longitude);
            if (places.data.length <= 30)
              setPlaces(prev => {
                let refData = [...prev.data];
                refData[1].data = [...refData[0].data, ...refData[1].data];
                refData[0].data = [
                  {
                    id: prev.length + 1,
                    location: place.display_name,
                    time: position.timestamp,
                  },
                ];
                return {
                  data: refData,
                  length: prev.length + 1,
                };
              });
            else GeoLocation.stopObserving();
          },
          error => {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            distanceFilter: 2000,
            accuracy: {
              android: 'high',
            },
          },
        );
      } else {
        ToastAndroid.show('Error in getting permission', ToastAndroid.SHORT);
      }
    }
    getLocationFuncStart();
    return () => {
      if (watchId !== null) GeoLocation.clearWatch(watchId);
    };
  }, []);

  const handleDeleteItem = (id = undefined) => {
    if (id === undefined)
      setPlaces(prev => {
        let modData = [...prev.data];
        modData[1].data = [];
        return {
          ...prev,
          data: modData,
        };
      });
    else {
      setPlaces(prev => {
        let modData = [...prev.data];
        modData[1].data = modData[1].data.filter(
          location => location.id !== id,
        );
        return {
          ...prev,
          data: modData,
        };
      });
    }
  };
  return (
    <View style={[{flex: 1}, styles.marV]}>
      <SectionList
        sections={places.data}
        keyExtractor={item => item.id.toString()}
        renderItem={props => <Item {...props} deleteItem={handleDeleteItem} />}
        renderSectionHeader={props => (
          <Text style={[styles.heading, styles.marH]}>
            {props.section.title}
          </Text>
        )}
      />

      <View style={styles.padH}>
        <Button title="Remove All" onPress={() => handleDeleteItem()} />
      </View>
    </View>
  );
}
