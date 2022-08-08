import {StyleSheet} from 'react-native';
import viewStyles from './view.styles';
export default StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  p1: {
    fontSize: 18,
  },
  p2: {
    fontSize: 14,
    color: 'black',
  },
  pad: {
    padding: '2.5%',
  },
  mar: {
    margin: '2.5%',
  },
  padV: {
    paddingVertical: '2.5%',
  },
  padH: {
    paddingHorizontal: '2.5%',
  },
  marV: {
    marginVertical: '2.5%',
  },
  marH: {
    marginHorizontal: '2.5%',
  },
  ...viewStyles,
});
