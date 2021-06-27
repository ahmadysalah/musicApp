import React, { useContext, useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, RefreshControl } from 'react-native';
import { VideoCard } from '../../components';
import { get } from '../../utils/ApiRequest';
import styles from './style';
import AuthContext from '../../utils/AuthContext';

const Following = ({ navigation }) => {
  const [followingChannels, setFallowingChannels] = useState();
  const [followingUsers, setFallowingUsers] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const isFocus = useIsFocused();
  const { scrollFollowing } = useContext(AuthContext);

  useEffect(() => {
    if (refreshing === true || followingChannels)
      get
        .getFollowing()
        .then(({ data: { channels, users } }) => {
          setFallowingChannels(channels);
          setFallowingUsers(users);
          setRefreshing(false);
        })
        .catch(console.log);
  }, [refreshing, isFocus]);

  return (
    <>
      <ScrollView
        ref={scrollFollowing}
        showsVerticalScrollIndicator={false}
        style={styles.containerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
      >
        {followingChannels &&
          followingUsers &&
          Object.keys(followingChannels).map((channel, index) => (
            <VideoCard
              navigation={navigation}
              key={index.toString()}
              channel={followingChannels[channel]}
              users={followingChannels[channel].viewers.map(
                (user) => followingUsers[user]
              )}
              channelId={channel}
              setUpdate={setRefreshing}
              update={refreshing}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default Following;
