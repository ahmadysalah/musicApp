import React from 'react';
import { View } from 'react-native';
import styles from './style';

import { Typography } from '../../components';

const StepContainer = ({ header, subText, children }) => (
  <View style={styles.content}>
    <View style={styles.header}>
      <Typography type="h3" style={styles.titleText}>
        {header}
      </Typography>
      {subText && (
        <Typography type="h7" color="secondary" style={styles.titleText}>
          {subText}
        </Typography>
      )}
    </View>
    {children}
  </View>
);

export default StepContainer;
