import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { DEVICE, RFValue } from '../../utils/constants';

const { platform, widthP } = DEVICE;
const styles = StyleSheet.create({
  headerLayout: {
    width: DEVICE.width,
    height: getStatusBarHeight() + 55,
    backgroundColor: '#fff',
  },
  headerVisible: {
    marginTop: platform === 'android' ? getStatusBarHeight() : 0,
    width: DEVICE.width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  logo: { width: 36, height: 36, marginRight: 8 },
  searchInput: {
    backgroundColor: '#f5f5f5',
    height: '120%',
    paddingHorizontal: '5%',
    borderRadius: 15,
    width: widthP(60),
    fontSize: RFValue(15),
  },
  user: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-between',
  },
  optionButtonStyle: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
  },
});

export default styles;
