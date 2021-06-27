import { StyleSheet } from 'react-native';
import { RFValue } from '../../utils/constants';

const styles = StyleSheet.create({
  h1: {
    fontSize: RFValue(30),
    fontFamily: 'NotoSansBold',
  },
  h2: {
    fontSize: RFValue(24),
    fontFamily: 'NotoSansBold',
  },
  h3: {
    fontSize: RFValue(20),
    fontFamily: 'NotoSansBold',
  },
  h4: {
    fontSize: RFValue(18),
    fontFamily: 'NotoSansBold',
  },
  h5: {
    fontSize: RFValue(16),
    fontFamily: 'NotoSansRegular',
  },
  h6: {
    fontSize: RFValue(14),
    fontFamily: 'NotoSansRegular',
  },
  h7: {
    fontSize: RFValue(12),
    fontFamily: 'NotoSansRegular',
  },
  small: {
    fontSize: RFValue(9),
    fontFamily: 'NotoSansRegular',
  },
});

export default styles;
