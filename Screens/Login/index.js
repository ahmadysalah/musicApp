import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-animatable';
import styles from './style';

import AuthContext from '../../utils/AuthContext';
import { Header, Button, InputText, Typography } from '../../components';
import { setTokenSecure } from '../../utils/SecureStorege';
import { AsyncStore } from '../../utils/AsyncStorage';
import { post } from '../../utils/ApiRequest';
import { COLORS } from '../../utils/constants';

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [logInError, setLogInError] = useState(false);
  const {
    authContext: { signIn },
  } = React.useContext(AuthContext);

  const isFormValidate = !(userName && password);

  const LoginUser = async (userData) => {
    const userToken = userData.headers['set-cookie'][0].split(';')[0];
    await setTokenSecure(userToken);
    await AsyncStore('userData', userData.data);
    setLoading(false);
    signIn(userData.data);
  };

  const onSubmit = () => {
    setLoading(true);
    post
      .userLogin(userName, password)
      .then(LoginUser)
      .catch(() => {
        setLogInError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Header navigation={navigation} back />
      <View style={styles.Container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Typography type="h3" bold style={styles.titleText}>
              Log In
            </Typography>
          </View>

          <InputText
            value={userName}
            type="username"
            onChange={setUserName}
            label="USERNAME OR EMAIL"
            onFocus={() => setLogInError(false)}
            autoCompleteType="username"
          />
          <InputText
            type="password"
            value={password}
            onChange={setPassword}
            label="PASSWORD"
            onFocus={() => setLogInError(false)}
            isSecure
            autoCompleteType="password"
          />
          {loading && !logInError && (
            <ActivityIndicator size="large" color={COLORS.highlight} />
          )}
          <Text animation="fadeIn" style={styles.errorMessage}>
            {logInError && 'Incorrect username or password. Please try again.'}
          </Text>
        </View>

        <View style={styles.content}>
          <Button title="Log in" disabled={isFormValidate} onPress={onSubmit} />
          <Typography
            type="h7"
            color="highlight"
            style={[styles.titleText, { marginTop: 18 }]}
            onPress={() => navigation.push('SignUp')}
          >
            Don’t have an account?
          </Typography>
        </View>
      </View>
    </>
  );
};

export default Login;
