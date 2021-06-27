/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-animatable';
import { Header, Button, InputText, Typography } from '../../components';
import DatePicker from './DatePicker';
import StepContainer from './StepContainer';
import styles from './style';
import AuthContext from '../../utils/AuthContext';
import { setTokenSecure, deleteSecureToken } from '../../utils/SecureStorege';
import { AsyncStore } from '../../utils/AsyncStorage';
import { post } from '../../utils/ApiRequest';
import { COLORS } from '../../utils/constants';

const SignUp = ({ navigation }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setBirthday] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPickerShow, setPickerShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [EmailAlreadyUse, checkEmailIsUse] = useState(false);
  const [UserNameAlreadyUse, checkUserNameIsUse] = useState(false);
  const {
    authContext: { signIn },
  } = React.useContext(AuthContext);

  const dateBirthCondition =
    new Date().getFullYear() -
      JSON.stringify(dateOfBirth).split('-')[0].substr(1, 4) >=
    13;

  const ValidateEmail = () =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/.test(
      email
    );
  const ValidatePassword = () =>
    /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  const isButtonDisable = [
    firstName && lastName && firstName.trim() !== '' && lastName.trim() !== '',
    ValidateEmail() && email.trim() !== '',
    dateBirthCondition,
    username.length > 2 && username.trim() !== '',
    ValidatePassword() && password.trim() !== '',
  ];

  const StoreToken = () => {
    setLoading(false);
    post
      .userLogin(username, password)
      .then(async (userData) => {
        const userToken = userData.headers['set-cookie'][0].split(';')[0];
        await setTokenSecure(userToken);
        await AsyncStore('userData', userData.data);
        signIn(userData.data);
      })
      .catch((err) => alert(err));
  };

  const onSubmit = () => {
    deleteSecureToken().then();
    setLoading(true);
    post
      .userSignUp({
        firstName,
        lastName,
        email,
        dateOfBirth,
        username,
        password,
      })
      .then(StoreToken)
      .catch(({ response }) => {
        if (response.data.message.includes('Username')) {
          checkUserNameIsUse(true);
          setTimeout(() => checkUserNameIsUse(false), 5000);
          setStepIndex(3);
        } else {
          checkEmailIsUse(true);
          setTimeout(() => checkUserNameIsUse(false), 5000);
          setStepIndex(1);
        }
        setLoading(false);
      });
  };

  const continueButtonWord = (() => {
    if (stepIndex === 0) return 'Sign Up & Accept';
    if (stepIndex > 0 && stepIndex <= 3) return 'Continue';
    return 'Sign Up';
  })();

  return (
    <>
      <Header
        navigation={navigation}
        back
        onPressBack={() =>
          stepIndex === 0 ? navigation.pop() : setStepIndex(stepIndex - 1)
        }
      />
      <View style={styles.Container}>
        {stepIndex === 0 && (
          <StepContainer header="What’s your name?">
            <InputText
              value={firstName}
              onChange={(value) => setFirstName(value.trim())}
              label="FIRST NAME"
              maxLength={50}
            />
            <InputText
              value={lastName}
              onChange={(value) => setLastName(value.trim())}
              label="LAST NAME"
              maxLength={50}
            />
          </StepContainer>
        )}

        {stepIndex === 1 && (
          <StepContainer
            header="Connect your email for
          security"
          >
            <InputText
              value={email}
              onChange={(value) => setEmail(value.trim())}
              label="YOUR EMAIL"
            />
            <Text animation="fadeIn" style={styles.errorMessage}>
              {EmailAlreadyUse && 'This email is already in use.'}
            </Text>
          </StepContainer>
        )}

        {stepIndex === 2 && (
          <StepContainer
            header="When’s your birthday?"
            subText="You can’t use Popitalk if you are under 13."
          >
            <DatePicker
              label="BIRTHDAY"
              isPickerShow={isPickerShow}
              setPickerShow={setPickerShow}
              value={dateOfBirth}
              onChangeValue={setBirthday}
            />
            <Text animation="fadeIn" style={styles.errorMessage}>
              {dateOfBirth &&
                !dateBirthCondition &&
                'you can’t use Popitalk if you are under 13'}
            </Text>
          </StepContainer>
        )}

        {stepIndex === 3 && (
          <StepContainer
            header="Choose a Username!"
            subText="
            We’re almost done 😊"
          >
            <InputText
              value={username}
              onChange={(value) => setUserName(value.trim())}
              label="USERNAME"
            />
            <Text animation="fadeIn" style={styles.errorMessage}>
              {UserNameAlreadyUse && 'Username already in use'}
            </Text>
          </StepContainer>
        )}

        {stepIndex === 4 && (
          <StepContainer
            header="Set a password"
            subText="Passwords should be at least 8 characters, and must include a number."
          >
            <InputText
              value={password}
              onChange={(value) => setPassword(value.trim())}
              label="PASSWORD"
              isSecure
            />
          </StepContainer>
        )}
        {loading && !EmailAlreadyUse && (
          <ActivityIndicator size="large" color={COLORS.highlight} />
        )}

        <View style={styles.button}>
          {stepIndex === 0 && (
            <Typography
              type="small"
              style={{ alignSelf: 'center', marginBottom: 4 }}
            >
              By tapping on Sign Up &amp; Accept, you agree to the Popitalk
              EULA, which is stated on our
              <Typography type="small" color="highlight">
                {' '}
                Terms{' '}
              </Typography>
              and
              <Typography type="small" color="highlight">
                {' '}
                Policy
              </Typography>
              .
            </Typography>
          )}
          <Button
            title={continueButtonWord}
            disabled={!isButtonDisable[stepIndex]}
            onPress={() =>
              stepIndex === 4 ? onSubmit() : setStepIndex(stepIndex + 1)
            }
          />
        </View>
      </View>
    </>
  );
};

export default SignUp;
