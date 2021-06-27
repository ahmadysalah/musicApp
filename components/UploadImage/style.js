import { StyleSheet } from 'react-native';
import { COLORS, DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  card: {
    height: DEVICE.heightP(7.5),
    justifyContent: 'center',
  },
  header: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 13,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  textFooter: {
    height: DEVICE.heightP(7.5),
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.tertiary,
  },
});

export default styles;
