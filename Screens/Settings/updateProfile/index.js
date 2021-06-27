/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';

import { Text } from 'react-native-animatable';
import { Overlay } from 'react-native-elements';
import DatePicker from '../../SignUp/DatePicker';

import {
  Header,
  InputText,
  Loading,
  Button,
  Typography,
} from '../../../components';
import { patch } from '../../../utils/ApiRequest';
import { AsyncStore } from '../../../utils/AsyncStorage';
import styles from './style';
import { DEVICE } from '../../../utils/constants';

const UpdateUserData = ({ navigation, route: { params } }) => {
  const [updateData, setUpdateData] = useState(
    params.title === 'Name'
      ? {
          firstName: params.userData.firstName,
          lastName: params.userData.lastName,
        }
      : params.title === 'Birthday'
      ? {
          dateOfBirth: params.AsyncUserData.dateOfBirth,
        }
      : params.title === 'Email'
      ? { email: params.AsyncUserData.email }
      : params.title === 'password' && { password: '' }
  );
  const [loading, setLoading] = useState();
  const [showError, setShowError] = useState('');
  const [isPickerShow, setPickerShow] = useState(false);
  const [isShowOverlay, setShowOverlay] = useState(true);
  const [repeatNewPassword, setRePassword] = useState();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await patch.updateUserData(updateData);
      await AsyncStore('userData', data);
      setShowOverlay(false);
      navigation.pop(2);
    } catch (error) {
      setShowError(true);
    }
    Keyboard.dismiss();
    setLoading(false);
  };
  const isFormValidate = !Object.values(updateData).filter((e) => e).length > 0;

  return (
    <>
      <Header
        navigation={navigation}
        back
        onPressBack={() => navigation.pop(2)}
        title={params.title}
      />
      <View style={styles.Container}>
        <View style={styles.content}>
          {params.title === 'Name' && (
            <>
              <InputText
                value={updateData.firstName}
                onChange={(value) =>
                  setUpdateData({ ...updateData, firstName: value })
                }
                label="First name"
                onFocus={() => setShowError(false)}
              />
              <InputText
                value={updateData.lastName}
                onChange={(value) =>
                  setUpdateData({ ...updateData, lastName: value })
                }
                label="Last name"
                onFocus={() => setShowError(false)}
              />
            </>
          )}
          {params.title === 'Birthday' && (
            <DatePicker
              label="Birthday"
              isPickerShow={isPickerShow}
              setPickerShow={setPickerShow}
              value={
                new Date(JSON.stringify(updateData.dateOfBirth).split('"')[1])
              }
              onChangeValue={(value) => setUpdateData({ dateOfBirth: value })}
            />
          )}

          {params.title === 'Email' && (
            <InputText
              value={updateData.email}
              onChange={(value) => setUpdateData({ email: value })}
              label="Email"
              onFocus={() => setShowError(false)}
            />
          )}
          {params.title === 'Password' && (
            <Overlay
              isVisible={isShowOverlay}
              animationType="slide"
              overlayStyle={{
                height: DEVICE.height * 0.6,
                width: '90%',
                justifyContent: 'space-evenly',
                borderRadius: 20,
                padding: '8%',
              }}
              onBackdropPress={() => navigation.pop()}
            >
              <>
                <View style={{ top: -10 }}>
                  <Typography type="h4" bold>
                    Changing password
                  </Typography>
                  <Typography type="h6" color="secondary">
                    Please enter your old password to continue
                  </Typography>
                </View>
                <InputText
                  value={updateData.password}
                  onChange={(value) =>
                    setUpdateData({ ...updateData, password: value })
                  }
                  label="Current Password"
                  onFocus={() => setShowError(false)}
                  isSecure
                />
                <InputText
                  value={updateData.newPassword}
                  onChange={(value) =>
                    setUpdateData({ ...updateData, newPassword: value })
                  }
                  label="New Password"
                  onFocus={() => setShowError(false)}
                  isSecure
                />
                <InputText
                  value={updateData.repeatNewPassword}
                  onChange={(value) => setRePassword(value)}
                  label="Confirm Password"
                  onFocus={() => setShowError(false)}
                  isSecure
                />
                <Text
                  animation={showError ? 'fadeIn' : 'fadeOut'}
                  style={styles.errorMessage}
                  duration={3000}
                >
                  {showError !== '' &&
                    'Check your Password, contain Characters and numbers'}
                </Text>
                <Loading
                  show={!!(loading && !showError)}
                  style={{ marginTop: '2.5%' }}
                />
                <Button
                  title="Confirm"
                  width="50%"
                  style={{ alignSelf: 'center', marginTop: '12.5%' }}
                  disabled={
                    isFormValidate ||
                    repeatNewPassword !== updateData.newPassword
                  }
                  onPress={onSubmit}
                />
              </>
            </Overlay>
          )}
          {params.title !== 'Password' && (
            <>
              <Loading
                show={!!(loading && !showError)}
                style={{ marginTop: '30%' }}
              />
              <Text
                animation={showError ? 'fadeIn' : 'fadeOut'}
                style={styles.errorMessage}
                duration={3000}
              >
                {showError !== '' && 'Check your data, Please try again'}
              </Text>
            </>
          )}
        </View>
        <View style={styles.content}>
          {params.title !== 'Password' && (
            <Button title="Save" disabled={isFormValidate} onPress={onSubmit} />
          )}
        </View>
      </View>
    </>
  );
};

export default UpdateUserData;
