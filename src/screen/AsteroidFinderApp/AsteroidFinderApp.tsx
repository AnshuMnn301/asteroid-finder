import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {ThemeContext} from '../../../App';
import Input from '../../components/Input';
import {
  AsteroidType,
  getAsteroidInfo,
  getRandAsteroid,
  NASA_API,
} from '../../utils/apicalls';

const Stack = createStackNavigator();
function AsteroidFinderApp() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={EnterAsteroid} name="Home" />
      <Stack.Screen component={AsteroidInfo} name="AsteroidInfo" />
    </Stack.Navigator>
  );
}

function AsteroidInfo({route}) {
  const {asteroidId} = route.params;
  const [asteroidInfo, setasteroidInfo] = React.useState<AsteroidType | null>(
    null,
  );
  const styles = React.useContext(ThemeContext);
  React.useEffect(() => {
    if (asteroidId) {
      async function fetchAsteroidInfo(astId: string) {
        if (astId !== 'random') setasteroidInfo(await getAsteroidInfo(astId));
        else setasteroidInfo(await getRandAsteroid());
      }
      fetchAsteroidInfo(asteroidId);
    }
  }, [asteroidId]);
  if (asteroidInfo)
    return (
      <View
        style={[
          {flex: 1, justifyContent: 'center', alignItems: 'center'},
          styles.marV,
        ]}>
        <Text style={styles.heading}>{asteroidInfo.name}</Text>
        <Text style={styles.heading}>
          {asteroidInfo.is_potentially_hazardous_asteroid
            ? 'DANGER'
            : 'NO DANGER'}
        </Text>
        <Text>{asteroidInfo.nasa_jpl_url}</Text>
      </View>
    );
  return null;
}
function EnterAsteroid({navigation}) {
  const styles = React.useContext(ThemeContext);
  const [asteroid, setAsteroid] = React.useState('');
  return (
    <View style={[styles.viewContainer, styles.marH]}>
      <Input
        placeHolder="Enter Asteroid ID"
        value={asteroid}
        type="numeric"
        setText={setAsteroid}
        pressed={() =>
          navigation.navigate('AsteroidInfo', {
            asteroidId: asteroid,
          })
        }
      />
      <View
        style={{
          position: 'absolute',
          left: '25%',
          top: '80%',
          right: '25%',
        }}>
        <Button
          title="Random Asteroid"
          onPress={() =>
            navigation.navigate('AsteroidInfo', {
              asteroidId: 'random',
            })
          }
        />
      </View>
    </View>
  );
}

export default AsteroidFinderApp;
