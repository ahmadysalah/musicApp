import { Platform, StyleSheet, StatusBar } from 'react-native';

import { DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: DEVICE.width,
    height: (DEVICE.width * 9) / 16,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  VideoContainer: {
    width: DEVICE.width,
    height: (DEVICE.width * 9) / 16,
    backgroundColor: 'black',
  },
  fullScreenVideo: {
    position: 'absolute',
    zIndex: 5000,
    height: DEVICE.height,
    marginTop: -DEVICE.heightP(3.1),
  },
  videoFullScreen: {
    height: '100%',
    width: DEVICE.height,
  },
  blockControl: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#fff0',
  },
});

export default styles;
