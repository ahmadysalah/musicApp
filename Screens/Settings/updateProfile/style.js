import { StyleSheet } from 'react-native';
import { GLOBAL_STYLE, RFValue, COLORS } from '../../../utils/constants';

const styles = StyleSheet.create({
  Container: {
    ...GLOBAL_STYLE.flexColum,
    alignSelf: 'center',
    width: '80%',
    flex: 0.95,
    justifyContent: 'space-between',
  },
  content: {
    // flex: 0.2,
    width: '100%',
    marginTop: '5%',
  },
  header: {
    marginBottom: '3%',
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
