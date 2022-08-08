import React from 'react';
import {View, Text, Button} from 'react-native';
import {ThemeContext} from '../../App';
import {LocationType} from '../utils/apicalls';

type Props = {
  item: LocationType;
  deleteItem: Function;
  section: {
    title: string;
    data: LocationType[];
  };
};

export const transformDate = (date: Date) =>
  `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
export default function Item({item, deleteItem, section}: Props) {
  const styles = React.useContext(ThemeContext);
  const placeName = item?.location;
  const date = new Date(item?.time as number);
  const timeStr = transformDate(date);
  return (
    <View
      style={[
        {
          borderRadius: 10,
          backgroundColor: 'lightgray',
          flexDirection: 'row',
          alignItems: 'center',
        },
        styles.mar,
        styles.pad,
      ]}>
      <View style={{width: '80%'}}>
        <Text style={styles.p1}>{placeName}</Text>
        <Text style={[{marginTop: 5}, styles.p2]}>{timeStr}</Text>
      </View>
      {section.title !== 'Current Location' && (
        <View style={{width: '20%'}}>
          <Button title="remove" onPress={() => deleteItem(item?.id)} />
        </View>
      )}
    </View>
  );
}
