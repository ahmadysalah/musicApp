import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import {
  Header,
  Image,
  Typography,
  Loading,
  SimpleAlert,
} from '../../components';
import { get } from '../../utils/ApiRequest';
import AuthContext from '../../utils/AuthContext';

import { AddUser, Settings } from '../../assets/Icons';
import styles from './style';

// deleteSecureToken();
const Setting = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const [syncUserData, setUserData] = useState();
  const isFocused = useIsFocused();
  const [message, setMessage] = useState();

  useEffect(() => {
    if (isFocused)
      get
        .getUserData(userData.id)
        .then(({ data }) => setUserData(data))
        .catch(() => setMessage('Something Happen, Try Again'));
  }, [isFocused]);

  return (
    <>
      <Header
        navigation={navigation}
        back
        RightIcon={Settings}
        rightIconOnPress={() =>
          syncUserData &&
          navigation.push('settings', { syncUserData, userData })
        }
      />
      <View style={styles.Container}>
        {syncUserData ? (
          <>
            {/* <AddUser /> */}
            <Image
              uri={syncUserData.avatar || 'https://i.imgur.com/An9lt8E.png'}
              rounded
              mode="cover"
              width={100}
              height={100}
            />
            <Typography type="h3" bold style={{ padding: 10 }}>
              {syncUserData.username}
            </Typography>
            <Typography type="h5" color="secondary">
              {`${syncUserData.firstName} ${syncUserData.lastName}`}
            </Typography>
            <View style={styles.followers}>
              <Typography type="h5">
                <Typography type="h5" bold>
                  {syncUserData.followingCount}{' '}
                </Typography>
                Following
              </Typography>

              <Typography type="h5">
                <Typography type="h5" bold>
                  {syncUserData.friendsCount}{' '}
                </Typography>
                Friends
              </Typography>
            </View>
          </>
        ) : (
          <Loading show />
        )}
      </View>
      <SimpleAlert message={message} setMessage={setMessage} />
    </>
  );
};

export default Setting;
