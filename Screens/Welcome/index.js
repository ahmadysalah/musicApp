import React from 'react';
import { View, Image } from 'react-native';
import { logo } from '../../assets/Images';
import { Button, Typography } from '../../components';
import styles from './style';

const Welcome = ({ navigation }) => (
  <View style={styles.Container}>
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <Typography type="h1" bold>
        Popitalk
      </Typography>
    </View>
    <View style={styles.buttonsContainer}>
      <Button
        title="Log In"
        textColor="highlight"
        color="tertiary"
        borderButton
        onPress={() => navigation.navigate('Login')}
      />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  </View>
);

export default Welcome;
