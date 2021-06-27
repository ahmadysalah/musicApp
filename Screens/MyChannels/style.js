import { StyleSheet } from 'react-native';
import { COLORS, DEVICE, GLOBAL_STYLE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    ...GLOBAL_STYLE.flexColum,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  titleStyle: {
    paddingBottom: 12,
  },
  createRowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE.height * 0.09,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.tertiary,
  },
  channel: {
    ...GLOBAL_STYLE.flexRow,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    height: DEVICE.height * 0.1,
    paddingHorizontal: 20,
  },
});

export default styles;
