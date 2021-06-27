import { StyleSheet } from 'react-native';
import { DEVICE, COLORS } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  PlayList: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    width: DEVICE.width * 0.54,
  },
  PlayListBackground: {
    flexDirection: 'row',
    width: DEVICE.width * 0.5,
    height: DEVICE.width * 0.5 * (9 / 16),
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  PlayListImage: {
    resizeMode: 'cover',
    borderRadius: 12,
  },
  PlayListControl: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: '30%',
    backgroundColor: '#323232',
    paddingHorizontal: 8,
  },
  videoTitle: {
    paddingBottom: 12,
  },
  typography: {
    marginTop: 8,
    marginBottom: 2,
  },
  verticalLayout: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: DEVICE.width,
    height: DEVICE.height - DEVICE.width * (9 / 16) - 54 - 100 - 60,
    paddingHorizontal: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: DEVICE.width * 0.95 - 24,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  addItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addItem: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.border,
    height: 50,
    borderRadius: 12,
    paddingVertical: 5,
  },
  inputStyle: {
    backgroundColor: '#f2f2f2',
    padding: 12,
  },
  addInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 18,
    width: '100%',
    paddingHorizontal: 6,
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
  socialBtn: {
    backgroundColor: COLORS.tertiary,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  searchControl: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
  bottomSheetStyle: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  scrollViewStyle: {
    paddingTop: 12,
  },
  saveBtn: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
    height: 30,
  },
  addVideoImage: {
    width: '100%',
    height: (DEVICE.width - 40) * (9 / 16) - 1,
    marginVertical: 10,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  videoCards: { marginBottom: 24 },
  addVideoTitle: { paddingHorizontal: 4, marginBottom: 4 },
  confirmMessage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: 10,
    paddingHorizontal: '10%',
    height: 'auto',
  },
});
export default styles;
