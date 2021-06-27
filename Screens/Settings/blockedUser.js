import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';

import AuthContext from '../../utils/AuthContext';
import { get, patch, Delete } from '../../utils/ApiRequest';
import {
  Header,
  Typography,
  Button,
  Loading,
  SimpleAlert,
} from '../../components';

import styles from './style';
import { DEVICE, RFValue } from '../../utils/constants';

const BlockedUser = ({ navigation }) => {
  const {
    userData: { id },
  } = useContext(AuthContext);
  const [blockedUserDate, setUsersBlocked] = useState();
  const [message, setMessage] = useState();

  const getUserBlockedData = async () => {
    try {
      let promise = Promise.resolve();
      const blockedUser = await get.getBlockedUsers();
      const blockedUserArray = [];
      blockedUser.map((usersId) => {
        promise = get
          .getUserById(usersId)
          .then(({ data }) => blockedUserArray.push(data));
      });

      promise.then(() => setUsersBlocked(blockedUserArray));
    } catch (error) {
      setMessage('Waite until get Data');
    }
  };

  useEffect(() => {
    if (blockedUserDate && blockedUserDate.length === 0)
      setMessage('There Is No Blocked Users');
  }, [blockedUserDate]);

  useEffect(() => {
    getUserBlockedData().then();
  }, []);

  const handleUnBlock = async (BlockerId) => {
    Delete.deleteBlockedById(BlockerId)
      .then(() => setMessage('User Was Unblocked Successfully'))
      .catch(() => setMessage('Error While Unblock User'));
    getUserBlockedData();
  };

  return (
    <>
      <Header navigation={navigation} back title="Blocked Users" />
      <Loading show={!blockedUserDate} />
      <ScrollView
        style={{ marginTop: '5%', flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {blockedUserDate &&
          blockedUserDate.map(
            ({ avatar, firstName, lastName, id, username }) => (
              <View
                style={[styles.blockedUserContainer, { marginTop: 5 }]}
                key={username}
              >
                <View style={styles.blockedUserCard}>
                  <Avatar
                    rounded
                    size="medium"
                    source={{
                      uri: avatar || 'https://i.imgur.com/An9lt8E.png',
                    }}
                  />
                  <View style={{ marginLeft: '10%' }}>
                    <Typography type="h3">{username}</Typography>
                    <Typography type="h6" color="secondary">
                      {`${firstName} ${lastName}`}
                    </Typography>
                  </View>
                </View>
                <Button
                  title="Unblock"
                  style={{ right: 0, width: DEVICE.widthP(20) }}
                  buttonTextStile={{ fontSize: RFValue(12) }}
                  onPress={() => handleUnBlock(id)}
                />
              </View>
            )
          )}
      </ScrollView>
      <SimpleAlert message={message} setMessage={setMessage} color="error" />
    </>
  );
};

export default BlockedUser;
