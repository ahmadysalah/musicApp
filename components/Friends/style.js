import { StyleSheet } from 'react-native';
import { DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 4,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    height: DEVICE.heightP(9),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  userTitles: { flexDirection: 'row', alignSelf: 'flex-start' },
  avatar: {
    width: 44,
    height: 44,
    marginRight: 12,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default styles;
