import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DEVICE } from '../../utils/constants';

const { platform } = DEVICE;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    height: '100%',
  },
  statusBar: {
    height: platform === 'ios' ? getStatusBarHeight() : 0,
    width: DEVICE.width,
  },
  chatHeader: {
    width: DEVICE.width,
    paddingHorizontal: '3%',
    height: 55,
    marginTop: platform === 'android' ? getStatusBarHeight() : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: '2%',
    backgroundColor: '#f2f2f2',
    fontSize: 16,
    width: '86%',
  },
  backButtonStyle: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 19,
    marginLeft: 6,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatTitle: {
    marginLeft: '5%',
  },
  roomName: {
    marginLeft: 12,
  },
  optionButtons: {
    flexDirection: 'row',
  },
  containerInputToolbar: {
    backgroundColor: 'red',
  },
});

export default styles;
