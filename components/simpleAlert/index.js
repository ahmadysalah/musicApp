import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { COLORS, DEVICE } from '../../utils/constants';
import Typography from '../Typography';

// to use this component u have to send full state to change by it
const SimpleAlert = ({ message, color, setMessage, style }) => {
  const animationView = useRef();
  return message ? (
    <View
      style={[styles.container, style]}
      animation="fadeIn"
      duration={1000}
      onAnimationEnd={() => {
        animationView.current.animate('fadeOut');
        setTimeout(() => {
          setMessage();
        }, 1000);
      }}
      ref={animationView}
    >
      <Typography
        type="h6"
        style={[
          styles.message,
          { backgroundColor: COLORS[color || 'secondary'] },
        ]}
      >
        {message}
      </Typography>
    </View>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  container: {
    top: '60%',
    position: 'absolute',
    zIndex: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  message: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: COLORS.tertiary,
  },
});
export default SimpleAlert;
