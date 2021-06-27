import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { decode } from 'html-entities';
import Typography from '../Typography';
import AvatarBox from '../AvatarBox';

import styles from '../videoCard/style';

const VideoDescription = ({ videoInfo, url, viewers, loading }) => (
  <>
    {videoInfo && videoInfo.videoInfo && (
      <View style={styles.bottomSection}>
        <Typography style={styles.videoTitle} type="h5" bold numberOfLines={2}>
          {videoInfo && decode(videoInfo.videoInfo.title)}
        </Typography>
        <AvatarBox
          viewers={videoInfo.viewers || viewers}
          usersNumber={videoInfo.viewersNumber}
        />
      </View>
    )}
    {loading && (
      <ActivityIndicator
        color="blue"
        size="large"
        style={{
          position: 'absolute',
          top: '20%',
          zIndex: 300,
          alignSelf: 'center',
        }}
      />
    )}
  </>
);

export default VideoDescription;
