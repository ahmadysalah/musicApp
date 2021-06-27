import { StyleSheet } from 'react-native';
import { GLOBAL_STYLE, RFValue, COLORS } from '../../utils/constants';

const styles = StyleSheet.create({
  Container: {
    ...GLOBAL_STYLE.flexColum,
    alignSelf: 'center',
    width: '73%',
    flex: 0.95,
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
  },
  header: {
    marginBottom: '5%',
  },
  titleText: {
    textAlign: 'center',
    paddingBottom: 9,
  },
  errorMessage: {
    fontFamily: 'NotoSansRegular',
    color: COLORS.error,
    fontSize: RFValue(11),
  },
});

export default styles;
