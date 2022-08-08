import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ThemeContext} from '../../../App';
import Input from '../../components/Input';
import {transformDate} from '../../components/Item';
import {getFetchResp} from '../../utils/apicalls';

const Stack = createStackNavigator();
const SpaceContext = React.createContext<any[]>([]);
function ParkingApp() {
  const [parking, setParking] = React.useState(null);
  return (
    <SpaceContext.Provider value={[parking, setParking]}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="WorkSpace" component={ParkingSpace} />
        <Stack.Screen name="Payment" component={CarRemoval} />
      </Stack.Navigator>
    </SpaceContext.Provider>
  );
}

const getAmount = (dur: number) => (dur <= 2 ? '$10' : `$${(dur - 1) * 10}`);
function CarRemoval({route, navigation}) {
  const styles = React.useContext(ThemeContext);
  const {details} = route.params;
  const amount = getAmount(parseFloat(details.duration));
  const [disabled, setDisabled] = React.useState(true);
  const [, setParking] = React.useContext(SpaceContext);
  const handlePayment = async () => {
    const data = await getFetchResp({
      'car-registration': details.carRegNum,
      charge: parseFloat(amount),
    });
    if (data) setDisabled(false);
  };
  return (
    <View style={[styles.viewContainer, {flexDirection: 'column'}]}>
      <Text style={[{textAlign: 'center'}, styles.p1]}>
        Used Parking Space for {parseFloat(details.duration)}hrs
        {'\n'} Total amount is {amount}
      </Text>
      <View style={styles.marV}>
        <Button title="Pay Now" onPress={handlePayment} disabled={!disabled} />
      </View>
      <View style={styles.marV}>
        <Button
          title="Dergister"
          disabled={disabled}
          onPress={() => {
            console.log(details.spaceNo);
            setParking({spaceNo: details.spaceNo});
            navigation.navigate('WorkSpace');
          }}
        />
      </View>
    </View>
  );
}
interface Props {
  item: [number, ['filled', Options, Date]];
  navigation: any;
}
function SpaceItem({item, navigation}: Props) {
  const styles = React.useContext(ThemeContext);
  const [spaceNo, [, options, bookeOn]] = item;
  const {value1, value2} = options;
  const transDate = transformDate(bookeOn);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Payment', {
          details: {
            duration: value2,
            carRegNum: value1,
            spaceNo,
          },
        })
      }>
      <View style={[styles.pad, styles.mar, {backgroundColor: 'lightgray'}]}>
        <Text>
          Parking Space No.: {spaceNo}
          {'\n'}
        </Text>
        <Text>Car Registration No: {value1}</Text>
        <Text>Booked On: {transDate}</Text>
        <Text>Duration: ${value2}hrs</Text>
      </View>
    </TouchableOpacity>
  );
}

interface Options {
  [key: string]: string;
}
function ParkingSpace({route, navigation}) {
  const spaces = route?.params?.spaces;
  const [parking] = React.useContext(SpaceContext);
  const [inputValue, setInputValue] = React.useState<Options>({});
  const styles = React.useContext(ThemeContext);
  const [spaceStatus, setSpaceStatus] = React.useState(() => {
    let map = new Map<number, 'vacant' | ['filled', Options, Date]>();
    if (Number.isInteger(Number(spaces))) {
      for (let i = 1; i <= parseInt(spaces); i++) map.set(i, 'vacant');
    }
    return map;
  });
  React.useEffect(() => {
    if (parking)
      setSpaceStatus(prev => {
        let map = new Map(prev);
        map.set(Number(parking.spaceNo), 'vacant');
        return map;
      });
  }, [parking]);

  const handlePlacedCar = () => {
    const vacantSpaces = [...spaceStatus.entries()].filter(
      ele => ele[1] === 'vacant',
    );
    if (!vacantSpaces.length) {
      ToastAndroid.showWithGravityAndOffset(
        'No Parking space available',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        100,
      );
    } else {
      const key =
        vacantSpaces[Math.floor(Math.random() * vacantSpaces.length)][0];
      setSpaceStatus(prev => prev.set(key, ['filled', inputValue, new Date()]));
      setInputValue({});
    }
  };

  const handleValue = (name: string, value: string) => {
    setInputValue(prev => ({...prev, [name]: value}));
  };

  const filledSpaces = [...spaceStatus.entries()].filter(
    ele => ele[1][0] === 'filled',
  ) as [number, ['filled', Options, Date]][];
  return (
    <View style={[styles.mar, {flex: 1}]}>
      <Input
        placeHolder="Enter car registration"
        value={inputValue?.value1}
        setText={text => handleValue('value1', text)}
        pressed={handlePlacedCar}
        extraInput={{
          placeHolder: 'Enter parking duration in hrs',
          setText: text => handleValue('value2', text),
          value: inputValue?.value2,
        }}
      />
      <Text style={[styles.marV, styles.p1]}>Space Allocated</Text>
      <FlatList
        data={filledSpaces}
        keyExtractor={item => item[0].toString()}
        renderItem={props => <SpaceItem {...props} navigation={navigation} />}
      />
    </View>
  );
}
function Home({navigation}) {
  const [value, setValue] = React.useState('');
  const styles = React.useContext(ThemeContext);
  return (
    <View style={[styles.viewContainer, styles.marH]}>
      <Input
        placeHolder="Enter no. of spaces"
        value={value}
        type="numeric"
        setText={setValue}
        pressed={() => {
          setValue('');
          navigation.navigate('WorkSpace', {
            spaces: value,
          });
        }}
      />
    </View>
  );
}

export default ParkingApp;
