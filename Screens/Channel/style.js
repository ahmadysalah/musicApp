import { StyleSheet } from 'react-native';
import { COLORS, DEVICE, GLOBAL_STYLE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
  },
  channelProfile: {
    flexDirection: 'column',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelTitle: {
    marginBottom: 12,
  },
  playlist: {
    backgroundColor: COLORS.primary,
  },
  descriptionSection: {
    paddingHorizontal: 2,
    paddingVertical: 12,
  },
  adminSection: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  adminAvatar: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  post: {
    marginTop: '5%',
    marginBottom: 12,
    backgroundColor: COLORS.tertiary,
    padding: '6%',
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  postHeader: {
    ...GLOBAL_STYLE.flexRow,
    justifyContent: 'flex-start',
  },
  postText: {
    marginVertical: 24,
    textAlign: 'left',
  },
  comments: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  postSection: {
    paddingBottom: 120,
    alignItems: 'center',
  },
  writePostSection: {
    backgroundColor: 'white',
    width: '96%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  postCountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  postActionSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  PlayListControl: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    alignSelf: 'center',
  },
  saveBtn: {
    backgroundColor: COLORS.tertiary,
    borderRadius: 12,
    height: 30,
  },
  settingsContainer: {
    marginVertical: 33,
  },
  heartView: {
    position: 'absolute',
    width: DEVICE.width * 0.5,
    height: DEVICE.height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    elevation: 10,
    alignSelf: 'center',
  },
  emptyText: {
    paddingVertical: 120,
  },
});
export default styles;
