import React from 'react';
import { View, Text } from 'react-native';

import styles from './style';

const Home = ({ navigation }) => (
  <View style={styles.Container}>
    <Text onPress={() => navigation.push('profile')}>Welcome to Popitalk</Text>
  </View>
);

export default Home;
