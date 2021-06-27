import { StyleSheet } from 'react-native';
import { COLORS, DEVICE, GLOBAL_STYLE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    padding: '2%',
    paddingHorizontal: '4.5%',
  },
  blockedUserContainer: {
    ...GLOBAL_STYLE.flexRow,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.tertiary,
    borderRadius: 20,
    padding: '2%',
  },
  blockedUserCard: {
    ...GLOBAL_STYLE.flexRow,
  },
  sheetContainer: {
    width: '100%',
    backgroundColor: COLORS.tertiary,
    borderRadius: 10,
    marginBottom: 10,
  },
  sheetCard: {
    textAlign: 'center',
    height: DEVICE.heightP(8),
    textAlignVertical: 'center',
  },
});
export default styles;
