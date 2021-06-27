import { StyleSheet } from 'react-native';
import { COLORS, DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: DEVICE.width,
    alignSelf: 'center',
    paddingVertical: 4,
    marginVertical: 4,
  },
  buttonsLayout: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE.width * (1 / 4),
    borderRightWidth: 1,
    borderColor: COLORS.disabled,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    marginBottom: 2,
  },
});

export default styles;
