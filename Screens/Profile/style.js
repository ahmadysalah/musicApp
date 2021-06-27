import { StyleSheet } from 'react-native';
import { GLOBAL_STYLE, RFValue, COLORS } from '../../utils/constants';

const styles = StyleSheet.create({
  Container: {
    ...GLOBAL_STYLE.flexColum,
    alignSelf: 'center',
    width: '90%',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: '5%',
  },
  followers: {
    padding: 10,
    marginTop: '10%',
    width: '100%',
    ...GLOBAL_STYLE.flexRow,
    justifyContent: 'space-evenly',
  },
});

export default styles;
