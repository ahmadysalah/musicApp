import { StyleSheet } from 'react-native';
import { DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  header: {
    width: DEVICE.width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  channelTitle: {
    width: '100%',
    alignSelf: 'center',
    marginLeft: 6,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  containerImage: {
    width: DEVICE.width,
    height: DEVICE.width * (9 / 16) - 1,
    resizeMode: 'cover',
  },
  videoTitle: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  bottomSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
export default styles;
