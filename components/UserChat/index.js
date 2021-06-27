/* eslint-disable no-nested-ternary */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import Typography from '../Typography';
import styles from './style';

const UserChat = ({
  image,
  name,
  lastMessage,
  isRead,
  isYou,
  messageTime,
  onPress,
  isOnline,
  numberOfMessages,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={styles.container}
  >
    <View style={styles.header}>
      <Avatar
        source={{
          uri: image || 'https://i.imgur.com/An9lt8E.png',
        }}
        rounded
        containerStyle={styles.avatar}
        size="medium"
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
            width: 18,
            height: 18,
            borderRadius: 20,
            borderColor: 'white',
            borderWidth: 2,
          }}
        />
      )}
      <View style={styles.userDescription}>
        <View style={styles.userTitles}>
          <Typography type="h6" color="primary" bold={isRead}>
            {name}
            {isRead && (
              <Badge
                value={numberOfMessages}
                status="primary"
                containerStyle={{ marginHorizontal: 2 }}
              />
            )}
          </Typography>
        </View>
        <View style={styles.recentMessage}>
          <View style={styles.recentMessage1}>
            <Typography
              type="h7"
              color={isRead ? 'primary' : 'secondary'}
              bold={isRead}
              numberOfLines={1}
            >
              {isYou && 'You: '}
              {lastMessage
                ? lastMessage.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)
                  ? 'GIF'
                  : lastMessage
                : 'Hey there im using Popitalk'}
            </Typography>
          </View>
          <Typography
            type="h7"
            color={isRead ? 'primary' : 'secondary'}
            bold={isRead}
          >
            {messageTime && ' ·  '}
            {messageTime && <TimeAgo time={messageTime} />}
          </Typography>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default UserChat;
