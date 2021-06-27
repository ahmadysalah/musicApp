import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
} from 'react-native';
import { Typography, VideoCard } from '../../components';
import { get } from '../../utils/ApiRequest';
import styles from './style';
import AuthContext from '../../utils/AuthContext';

const Explore = ({ navigation }) => {
  const [followingChannels, setFallowingChannels] = useState();
  const [followingUsers, setFallowingUsers] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [discover, setDiscover] = useState(true);
  const isFocus = useIsFocused();
  const { scrollExplore } = useContext(AuthContext);

  useEffect(() => {
    if (refreshing === true)
      get[discover ? 'getDiscover' : 'getTrending'](1)
        .then(({ data: { channels, users } }) => {
          console.log('here');
          setFallowingChannels(channels);
          setFallowingUsers(users);
          setRefreshing(false);
        })
        .catch(console.log);
  }, [refreshing, discover, isFocus]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.tabsLayout}>
        <ScrollView horizontal style={styles.tabScroll}>
          <TouchableOpacity
            onPress={() => {
              setFallowingChannels({});
              setDiscover(true);
              setRefreshing(!refreshing);
            }}
            style={discover ? styles.activeTab : styles.nonActiveTab}
          >
            <Typography
              type="h6"
              style={discover ? styles.activeText : styles.nonActiveText}
            >
              Discover
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFallowingChannels({});
              setDiscover(false);
              setRefreshing(!refreshing);
            }}
            style={discover ? styles.nonActiveTab : styles.activeTab}
          >
            <Typography
              type="h6"
              style={discover ? styles.nonActiveText : styles.activeText}
            >
              Trending
            </Typography>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView
        ref={scrollExplore}
        showsVerticalScrollIndicator={false}
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
    </View>
  );
};

export default Explore;
