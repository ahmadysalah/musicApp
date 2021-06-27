import { StyleSheet } from 'react-native';
import { COLORS, RFValue } from '../../utils/constants';

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 0,
  },
  inputStyle: {
    borderRadius: 16,
    padding: '2.4%',
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: '1.4%',
    marginHorizontal: -15,
    color: COLORS.secondary,
    fontSize: RFValue(11),
  },
  error: { paddingLeft: 10, fontSize: RFValue(11) },
});

export default styles;
