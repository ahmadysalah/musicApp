import { StyleSheet } from 'react-native';
import { COLORS, DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: DEVICE.heightP(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 0.5,
    marginVertical: 2,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  userDescription: {
    width: DEVICE.width - 60 - 30 - 15,
    flexDirection: 'column',
  },
  userTitles: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'flex-start',
  },
  recentMessage: {
    flexDirection: 'row',
    marginTop: 5,
  },
  recentMessage1: {
    maxWidth: '64%',
  },
  avatar: {
    marginRight: 15,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default styles;
