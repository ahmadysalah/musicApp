import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { decode } from 'html-entities';
import { loadingImg } from '../../assets/Images';
import AvatarBox from '../AvatarBox';
import Typography from '../Typography';
import Image from '../Image';
import styles from './style';

const Card = ({ channel, users, navigation, channelId }) => (
  <>
    {channel && (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('channels', {
            screen: 'channel',
            params: {
              channelId,
              VideoDetails: {
                videoInfo: channel.videoInfo,
                viewers: Object.values(users).slice(0, 15),
                viewersNumber: Object.values(users).length,
                // length: channel.length,
              },
            },
          })
        }
      >
        <View style={styles.header}>
          <View style={styles.title}>
            <Avatar
              source={{
                uri: channel.icon || 'https://i.imgur.com/An9lt8E.png',
              }}
              rounded
              containerStyle={styles.avatar}
              size="medium"
            />
            <Typography style={styles.channelTitle} type="h6" bold>
              {channel.name}
            </Typography>
          </View>
          {channel.playbackStatus === 'Playing' ? (
            <Image
              source={loadingImg}
              height={15}
              width={30}
              style={{
                transform: [{ rotate: '180deg' }],
              }}
            />
          ) : (
            // <PlayingBtn />
            <></>
          )}
        </View>
        <Image
          uri={
            channel.videoInfo
              ? channel.videoInfo.thumbnail
              : 'https://i.imgur.com/eTLredM.png'
          }
          style={styles.containerImage}
        />
        <View style={styles.bottomSection}>
          <Typography
            style={styles.videoTitle}
            type="h5"
            bold
            numberOfLines={2}
          >
            {channel.videoInfo && decode(channel.videoInfo.title)}
          </Typography>
          <AvatarBox
            viewers={Object.values(users).slice(0, 15)}
            usersNumber={Object.values(users).length}
          />
        </View>
      </TouchableOpacity>
    )}
  </>
);
export default Card;
