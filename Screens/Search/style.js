import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS, DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  header: {
    width: DEVICE.width,
    backgroundColor: 'white',
  },
  headerVisible: {
    marginTop: getStatusBarHeight(),
    width: DEVICE.width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabScroll: {
    width: '100%',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  activeTab: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  nonActiveTab: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 4,
  },
  activeText: {
    color: COLORS.tertiary,
  },
  nonActiveText: {
    color: COLORS.secondary,
  },
  input: {
    width: '90%',
    height: '100%',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    fontSize: 18,
  },
  scrollView: {
    paddingBottom: 32,
  },
  resultsText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  noMatchFound: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: DEVICE.height,
  },
});

export default styles;
