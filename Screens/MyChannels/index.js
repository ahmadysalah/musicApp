import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';

import { Avatar } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import AuthContext from '../../utils/AuthContext';
import { get } from '../../utils/ApiRequest';
import { Typography } from '../../components';

import styles from './style';

const MyChannels = ({ navigation }) => {
  const [MyChannelsData, setChannel] = useState([]);
  const { userData } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(true);
  const isFocused = useIsFocused();
  const { scrollChannels } = useContext(AuthContext);
  useEffect(() => {
    if (refreshing || isFocused)
      get
        .refreshSessions(userData.id)
        .then(({ data: { channels } }) => {
          const myChannelsIds = Object.keys(channels).reduce((ch, element) => {
            if (channels[element].ownerId === userData.id)
              ch.push(channels[element]);
            return ch;
          }, []);
          setChannel(myChannelsIds);
        })
        .catch(console.log);

    setRefreshing(false);
  }, [refreshing, isFocused]);

  const renderItem = ({ item: { name, icon, viewers, id } }) => (
    <View style={styles.content}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('channels', {
            screen: 'channel',
            params: { channelId: id },
          });
        }}
      >
        <View style={styles.channel}>
          <Avatar
            source={{ uri: icon || 'https://i.imgur.com/An9lt8E.png' }}
            rounded
            size="medium"
          />
          <View style={{ marginLeft: 16 }}>
            <Typography type="h6">{name}</Typography>
            <Typography type="h7">{viewers.length} online</Typography>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollChannels}
        data={MyChannelsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Typography
              type="h7"
              color="secondary"
              bold
              style={styles.titleStyle}
            >
              MY CHANNELS
            </Typography>
            <TouchableOpacity
              style={styles.createRowStyle}
              onPress={() => navigation.push('channels')}
            >
              <Typography
                type="h1"
                color="tertiary"
                style={{ marginRight: 12 }}
              >
                +
              </Typography>
              <Typography type="h6" color="tertiary">
                Create your own channel
              </Typography>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
      />
    </View>
  );
};

export default MyChannels;
