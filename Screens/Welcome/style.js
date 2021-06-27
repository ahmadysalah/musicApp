import { StyleSheet } from 'react-native';
import { GLOBAL_STYLE, DEVICE } from '../../utils/constants';

const { widthP, heightP } = DEVICE;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    ...GLOBAL_STYLE.flexColum,
    justifyContent: 'space-between',
    paddingTop: heightP('15%'),
    paddingBottom: heightP('5%'),
    backgroundColor: '#F2F2F2',
  },
  header: {
    ...GLOBAL_STYLE.flexColum,
    flex: 0.5,
  },
  buttonsContainer: {
    ...GLOBAL_STYLE.flexColum,
    justifyContent: 'space-evenly',
    width: widthP('80%'),
    height: heightP('16%'),
  },
  logo: {
    width: widthP('20%'),
    height: widthP('20%'),
  },
});

export default styles;
