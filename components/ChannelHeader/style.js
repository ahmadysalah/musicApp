import { StyleSheet, StatusBar } from 'react-native';

import { COLORS, DEVICE } from '../../utils/constants';

const { platform } = DEVICE;
const styles = StyleSheet.create({
  SafeArea: {
    marginTop: platform === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    height: platform === 'android' ? 55 : 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: DEVICE.width,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  leftIcon: {
    width: '10%',
    height: platform === 'android' ? 55 : 49,
    justifyContent: 'center',
  },
  rightIcon: {
    flexDirection: 'row',
    width: '10%',
    justifyContent: 'flex-end',
  },
  channelTitle: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controlsStyle: {
    color: COLORS.secondary,
  },
});

export default styles;
