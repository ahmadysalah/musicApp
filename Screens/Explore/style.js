import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  tabsLayout: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  tabScroll: {
    paddingHorizontal: 12,
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
});

export default styles;
