import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Typography from '../Typography';
import styles from './style';

import {
  ChatIcon,
  FollowingIcon,
  PlayListSortIcon,
  SearchIcon,
} from '../../assets/Icons';
import { COLORS } from '../../utils/constants';

const ChannelTabs = ({
  isAdmin,
  tab,
  channelTabPressed,
  chatTabPressed,
  playlistTabPressed,
  searchTabPressed,
}) => (
  <ScrollView horizontal contentContainerStyle={styles.container}>
    <TouchableOpacity
      style={styles.buttonsLayout}
      activeOpacity={0.5}
      onPress={channelTabPressed}
    >
      <View style={styles.buttons}>
        <FollowingIcon active={tab === 'channel'} />
      </View>
      <Typography
        type="small"
        bold={tab === 'channel'}
        style={{
          color: tab === 'channel' ? COLORS.primary : COLORS.secondary,
        }}
      >
        Channel
      </Typography>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttonsLayout}
      activeOpacity={0.5}
      onPress={chatTabPressed}
    >
      <View style={styles.buttons}>
        <ChatIcon active={tab === 'chat'} />
      </View>
      <Typography
        type="small"
        bold={tab === 'chat'}
        style={{ color: tab === 'chat' ? COLORS.primary : COLORS.secondary }}
      >
        Chat
      </Typography>
    </TouchableOpacity>
    {isAdmin && (
      <>
        <TouchableOpacity
          style={styles.buttonsLayout}
          onPress={searchTabPressed}
        >
          <View style={styles.buttons}>
            <SearchIcon
              chat
              color={tab === 'search' ? COLORS.primary : COLORS.secondary}
            />
          </View>
          <Typography
            type="small"
            bold={tab === 'search'}
            style={{
              color: tab === 'search' ? COLORS.primary : COLORS.secondary,
            }}
          >
            Search Videos
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsLayout}
          onPress={playlistTabPressed}
        >
          <View style={styles.buttons}>
            <PlayListSortIcon
              color={tab === 'playlist' ? COLORS.primary : COLORS.secondary}
            />
          </View>
          <Typography
            type="small"
            bold={tab === 'playlist'}
            style={{
              color: tab === 'playlist' ? COLORS.primary : COLORS.secondary,
            }}
          >
            Manage Playlist
          </Typography>
        </TouchableOpacity>
      </>
    )}
  </ScrollView>
);

export default ChannelTabs;
