import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { COLORS } from '../../utils/constants';

const Loading = ({ show, size, color, style, fullScreen }) =>
  show && (
    <View
      style={[
        styles.container,
        fullScreen && { height: '100%', width: '100%', position: 'absolute' },
        style,
      ]}
    >
      <ActivityIndicator
        size={size || 'large'}
        color={color || COLORS.highlight}
        style={style}
      />
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;
