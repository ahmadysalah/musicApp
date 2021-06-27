import { StyleSheet } from 'react-native';
import { GLOBAL_STYLE, COLORS, RFValue } from '../../utils/constants';

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
    marginBottom: '10%',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: '1.5%',
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: COLORS.highlight,
    borderRadius: 10,
    padding: '2.2%',
    paddingHorizontal: 10,
    paddingLeft: '10%',
    backgroundColor: 'white',
  },
  dateContent: {
    padding: '1.5%',
    marginHorizontal: -18,
    color: COLORS.primary,
    fontSize: RFValue(16),
    fontFamily: 'NotoSansRegular',
  },
  errorMessage: {
    fontFamily: 'NotoSansRegular',
    color: COLORS.error,
    fontSize: RFValue(12),
    margin: 10,
  },
  button: {
    width: '100%',
  },
});

export default styles;
