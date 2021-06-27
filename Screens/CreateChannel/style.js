import { StyleSheet } from 'react-native';
import { DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    height: DEVICE.height * 0.9,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  description: {
    width: '95%',
    textAlign: 'center',
    padding: '2%',
    paddingBottom: '5%',
  },
  button: {},
});
export default styles;
