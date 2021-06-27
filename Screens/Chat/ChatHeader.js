import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, Tooltip } from 'react-native-elements';

import {
  BackArrow,
  DotMenu,
  SearchIcon,
  PlayListSortIcon,
} from '../../assets/Icons';
import { Typography } from '../../components';
import { COLORS, DEVICE } from '../../utils/constants';
import styles from './style';
import EditPlaylist from '../../components/Playlist/EditPlaylist';

const ChatHeader = ({
  navigation,
  isOpen,
  setOpen,
  avatar,
  username,
  isOnline,
  channelData,
  setAddVideo,
  onPressDeleteVD,
  refreshChat,
}) => (
  <>
    <View style={styles.statusBar} />
    <View style={styles.chatHeader}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UsersChat')}
          style={styles.backButtonStyle}
        >
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.chatTitle}>
          <Avatar
            source={{
              uri: avatar || 'https://i.imgur.com/An9lt8E.png',
            }}
            rounded
            containerStyle={styles.avatar}
            size="small"
          />
          {isOnline && (
            <Badge
              status="success"
              containerStyle={{
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
              badgeStyle={{
                width: 12,
                height: 12,
                borderRadius: 20,
                borderColor: 'white',
                borderWidth: 2,
              }}
            />
          )}
        </View>
        <Typography type="h6" style={styles.roomName} bold>
          {username}
        </Typography>
      </View>
      <View style={styles.optionButtons}>
        <Tooltip
          backgroundColor="#fff"
          width={DEVICE.width * 0.95}
          containerStyle={{
            height: 'auto',
            maxHeight: DEVICE.height * 0.88,
            minHeight: DEVICE.height * 0.3,
          }}
          overlayColor="rgba(0,0,0,0.4)"
          popover={
            channelData && (
              <EditPlaylist
                data={channelData.queue}
                channelId={channelData.id}
                onPressDeleteVD={onPressDeleteVD}
                refresh={refreshChat}
              />
            )
          }
        >
          <View style={styles.buttonStyle}>
            <PlayListSortIcon color={COLORS.primary} />
          </View>
        </Tooltip>
        <TouchableOpacity
          onPress={() => setAddVideo(true)}
          style={styles.buttonStyle}
        >
          <SearchIcon chat color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpen(!isOpen)}
          style={styles.buttonStyle}
        >
          <DotMenu color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  </>
);

export default ChatHeader;
