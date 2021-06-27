import { StyleSheet } from 'react-native';
import { COLORS, DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiary,
    maxHeight: DEVICE.height * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 20,
    paddingHorizontal: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
});
export default styles;
