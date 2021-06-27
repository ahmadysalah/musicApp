import { StyleSheet } from 'react-native';
import { DEVICE } from '../../utils/constants';

const { platform } = DEVICE;
const styles = StyleSheet.create({
  tabBarStyle: {
    height: platform === 'android' ? DEVICE.heightP(8) : DEVICE.heightP(10),
  },
  buttonStyle: {
    color: '#323232',
  },
  badgeStyle: {
    fontSize: 10,
    backgroundColor: '#1DA4FE',
    color: '#fff',
  },
});

export default styles;
