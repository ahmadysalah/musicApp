import React from 'react';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Typography from '../Typography';
import { COLORS } from '../../utils/constants';
import styles from './style';

// colors [primary,secondary,tertiary,highlight,error]
// Gradient [primary,light,cancel,brand]
const ButtonComponent = ({
  title,
  onPress,
  color,
  width,
  invert,
  style,
  textColor,
  disabled,
  borderButton,
  buttonTextStile,
  height,
  radius = 16,
  gradientStyle,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.655}
    style={[
      {
        width: width || '100%',
        borderRadius: radius,
        marginVertical: 10,
      },
      height && { height },
      style,
      borderButton && {
        borderWidth: 1,
        borderColor: COLORS.highlight,
      },
    ]}
    disabled={disabled}
  >
    <LinearGradient
      // Button Linear Gradient
      colors={
        !disabled
          ? COLORS.Gradient[color || 'primary']
          : [COLORS.disabled, COLORS.disabled]
      }
      style={[
        styles.buttonGradient,
        height && { height },
        radius && { borderRadius: radius },
        gradientStyle,
      ]}
      start={invert ? [0, 1] : [1, 0]}
      end={invert ? [1, 0] : [0, 1]}
    >
      <Typography
        color={textColor || 'tertiary'}
        type="h4"
        bold
        style={[{ zIndex: 500 }, buttonTextStile]}
      >
        {title}
      </Typography>
    </LinearGradient>
  </TouchableOpacity>
);

export default ButtonComponent;
