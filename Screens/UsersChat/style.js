import { StyleSheet } from 'react-native';
import { COLORS, DEVICE } from '../../utils/constants';

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'white',
    width: '100%',
  },
  input: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 4,
    backgroundColor: '#f2f2f2',
    fontSize: 18,
    width: '90%',
  },
  composeButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
  },
  buttonFirst: {
    position: 'absolute',
    // top: DEVICE.heightP(70),
    right: '3%',
    zIndex: 1,
    bottom: 10,
  },
  createRoomView: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    alignSelf: 'flex-end',
    height: '100%',
    // padding: 10,
    backgroundColor: COLORS.tertiary,
  },
});

export default styles;
