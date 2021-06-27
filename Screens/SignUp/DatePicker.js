import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from '../../components';

import styles from './style';
import { COLORS } from '../../utils/constants';

const DatePicker = ({
  label,
  value,
  onChangeValue,
  isPickerShow,
  setPickerShow,
}) => {
  const [isPressd, setPressed] = useState(false);
  // this function to change date from date picker
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    // this set to hide date picker after event
    setPickerShow(false);
    // and this to set new date value to date of Birth
    onChangeValue(currentDate);

    // this condition to check if user add value of cancel
    if (event.type === 'set') {
      setPressed(true);
    }
  };

  return (
    <>
      <View>
        <Typography
          type="h7"
          bold
          style={{ marginBottom: 5, color: COLORS.secondary }}
        >
          {label}
        </Typography>

        <TouchableOpacity
          onPress={() => setPickerShow(true)}
          style={styles.dateContainer}
        >
          <Typography style={styles.dateContent}>
            {value && JSON.stringify(value).split('T')[0].slice(1)}
          </Typography>
        </TouchableOpacity>
      </View>
      {isPickerShow && (
        // this pop up card has date picker to select the date you want
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          shouldRasterizeIOS
          maximumDate={new Date()}
        />
      )}
    </>
  );
};
export default DatePicker;
