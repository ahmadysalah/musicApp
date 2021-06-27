import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import Item from '../Settings/ListItem';
import { COLORS } from '../../utils/constants';

import { Alert } from '../../components';
import styles from './style';
import { Delete } from '../../utils/ApiRequest';

const ChannelSettings = ({
  channelId,
  navigation,
  channel,
  refreshChannel,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const goTo = (menu) =>
    navigation.push('manageUsers', {
      menu,
      channelId,
      channel,
    });
  const isFocused = useIsFocused();

  useEffect(() => {
    refreshChannel();
  }, [isFocused]);

  const list = [
    {
      title: 'Channel Settings',
      onPress: () => navigation.push('createChannel', { channelId, channel }),
    },
    { title: 'Manage Followers', onPress: () => goTo('Manage Followers') },
    { title: 'Manage Admins', onPress: () => goTo('Manage Admins') },
    { title: 'Banned Users', onPress: () => goTo('Banned Users') },
    { title: 'Delete Channel', onPress: toggleModal },
  ];

  const deleteChannel = () =>
    Delete.deleteChannel(channelId)
      .then((data) => {
        toggleModal();
        setTimeout(() => navigation.goBack(), 100);
      })
      .catch(console.log);

  return (
    <>
      <View style={styles.settingsContainer}>
        <Item title={list[0].title} onPress={list[0].onPress} icon />
        <Item title={list[1].title} onPress={list[1].onPress} icon />
        <Item title={list[2].title} onPress={list[2].onPress} icon />
        <Divider style={{ height: 32, backgroundColor: 'transparent' }} />
        <Item title={list[3].title} onPress={list[3].onPress} icon />
        <Divider style={{ height: 32, backgroundColor: 'transparent' }} />
        <Item
          title={list[4].title}
          onPress={list[4].onPress}
          titleStyle={{ color: COLORS.error }}
        />
      </View>

      <Alert
        isModalVisible={isModalVisible}
        title="Delete Channel"
        content="You cannot undo this action"
        onPressCancel={deleteChannel}
        toggleAlert={toggleModal}
      />
    </>
  );
};
export default ChannelSettings;
